"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { logout } from "@/lib/api/client/auth/authApi";
import {
  deleteAvatar,
  getCurrentUser,
  updateAvatar,
  updateUser,
} from "@/lib/api/client/user/userApi";
import type {
  GetUserResponse,
  UpdateUserRequest,
} from "@/lib/api/types/user.types";
import { useAuthStore } from "@/lib/store/authStore";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import BurgerMenuBtn from "./BurgerMenuBtn/BurgerMenuBtn";
import css from "./Header.module.css";
import Logo from "./Logo/Logo";
import TransactionsHistoryNav from "./TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "./UserBarBtn/UserBarBtn";
import UserPanel from "./UserPanel/UserPanel";
import UserSetsModal from "./UserSetsModal/UserSetsModal";
import Modal from "../Modal/Modal";
import Logout from "../Logout/Logout";

const hasApiConfig = Boolean(process.env.NEXT_PUBLIC_API_URL);

export default function Header() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  // 1. Извлекаем данные и сразу называем их user. Указываем тип <GetUserResponse>
  const { data: user } = useQuery<GetUserResponse>({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { isAuthenticated } = useAuthStore();

  // 2. Исправлено: работаем с user?.name и добавили проверку на существование user
  const initials = useMemo(() => {
    if (!user?.name) return "";
    return user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }, [user?.name]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsBurgerOpen(false);
        setIsUserPanelOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const syncCurrentUser = async () => {
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  };

  const applyUserUpdate = (nextUser: GetUserResponse) => {
    queryClient.setQueryData(["current-user"], nextUser);
  };

  // Мутации
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: async (updatedUser) => {
      if (!user) return;
      applyUserUpdate({ ...user, ...updatedUser });
      await syncCurrentUser();
      toast.success("Profile updated.");
    },
    onError: () => toast.error("Unable to update profile."),
  });

  const updateAvatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: async (updatedAvatar) => {
      if (!user) return;
      applyUserUpdate({ ...user, avatarUrl: updatedAvatar.avatarUrl });
      await syncCurrentUser();
      toast.success("Avatar updated.");
    },
    onError: () => toast.error("Unable to upload avatar."),
  });

  const deleteAvatarMutation = useMutation({
    mutationFn: deleteAvatar,
    onSuccess: async () => {
      if (!user) return;
      applyUserUpdate({ ...user, avatarUrl: null });
      await syncCurrentUser();
      toast.success("Avatar removed.");
    },
    onError: () => toast.error("Unable to remove avatar."),
  });

  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  // Обработчики
  const closeBurger = () => {
    setIsBurgerOpen(false);
    setIsUserPanelOpen(false);
  };

  const handleProfileSettingsClick = () => {
    setIsUserPanelOpen(false);
    setIsBurgerOpen(false);
    setIsUserSettingsOpen(true);
  };

  const handleLogoutClick = () => {
    setIsUserPanelOpen(false);
    setIsBurgerOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      clearIsAuthenticated();
      queryClient.removeQueries({ queryKey: ["current-user"] });
      setIsLogoutModalOpen(false);
      setIsUserPanelOpen(false);
      setIsBurgerOpen(false);
      toast.success("Logged out.");
      router.push("/");
    } catch {
      toast.error("Unable to log out.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSave = async (payload: UpdateUserRequest) => {
    if (!hasApiConfig) {
      if (!user) return;
      applyUserUpdate({ ...user, ...payload });
      setIsUserSettingsOpen(false);
      toast.success("Profile updated locally.");
      return;
    }
    try {
      await updateUserMutation.mutateAsync(payload);
      setIsUserSettingsOpen(false);
    } catch {}
  };

  const handleUploadAvatar = async (file: File) => {
    if (!hasApiConfig) {
      if (!user) return "";
      const localUrl = URL.createObjectURL(file);
      applyUserUpdate({ ...user, avatarUrl: localUrl });
      toast.success("Avatar updated locally.");
      return localUrl;
    }
    const response = await updateAvatarMutation.mutateAsync(file);
    return response.avatarUrl;
  };

  const handleRemoveAvatar = async () => {
    if (!hasApiConfig) {
      if (!user) return;
      applyUserUpdate({ ...user, avatarUrl: null });
      toast.success("Avatar removed locally.");
      return;
    }
    await deleteAvatarMutation.mutateAsync();
  };

  
  if (!isAuthenticated) {
    return (
      <header className={`${css.header} ${css.headerHome}`}>
        <div className={css.logoHome}>
          <Logo />
        </div>
      </header>
    );
  }

  // Если данных еще нет, можно вернуть скелетон или null
  if (!user) return null;

  const userBar = (
    <div className={css.userArea}>
      <UserBarBtn
        userName={user.name || ""}
        avatarUrl={user.avatarUrl}
        initials={initials}
        isOpen={isUserPanelOpen}
        onToggle={() => setIsUserPanelOpen((value) => !value)}
      />

      {isUserPanelOpen && (
        <UserPanel
          onProfileSettingsClick={handleProfileSettingsClick}
          onLogoutClick={handleLogoutClick}
        />
      )}
    </div>
  );

  return (
    <>
      <header className={css.header}>
        <Logo />

        <nav className={css.desktopNav} aria-label="Transactions history">
          <TransactionsHistoryNav pathname={pathname} />
        </nav>

        <div className={css.desktopUser}>{userBar}</div>

        <BurgerMenuBtn
          isOpen={isBurgerOpen}
          onClick={() => {
            setIsBurgerOpen((value) => !value);
            setIsUserPanelOpen(false);
          }}
        />
      </header>

      {isBurgerOpen && (
        <BurgerMenu
          userBar={userBar}
          onClose={closeBurger}
          nav={
            <TransactionsHistoryNav
              pathname={pathname}
              isBurger
              onNavigate={closeBurger}
            />
          }
        />
      )}

      {isUserSettingsOpen && (
        <UserSetsModal
          name={user.name || ""}
          currency={user.currency}
          avatarUrl={user.avatarUrl}
          onClose={() => setIsUserSettingsOpen(false)}
          onSave={handleSave}
          onUploadAvatar={handleUploadAvatar}
          onRemoveAvatar={handleRemoveAvatar}
          isSaving={
            updateUserMutation.isPending ||
            updateAvatarMutation.isPending ||
            deleteAvatarMutation.isPending
          }
        />
      )}

      {isLogoutModalOpen && (
        <Modal onClose={() => setIsLogoutModalOpen(false)}>
          <Logout
            onCancel={() => setIsLogoutModalOpen(false)}
            onConfirm={handleConfirmLogout}
            isLoading={isLoggingOut}
          />
        </Modal>
      )}
    </>
  );
}