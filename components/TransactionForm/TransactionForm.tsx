import css from './TransactionForm.module.css';

export default function TransactionForm() {
  return (
    <div className={css['container-form']}>
      <form className={css['contact-content-form']}>
        <div className={css['contact-content-groop']} /*radiobaton*/>
          <label className={css['contact-content-label']}>
            <input
              type="radio"
              name="typeTransaction"
              value="expense"
              defaultChecked
            />
            Expense
          </label>
          <label className={css['contact-content-label']}>
            <input type="radio" name="typeTransaction" value="income" />
            Income
          </label>
        </div>
        <div className={css['contact-content-groop-datetime']} /*date time*/>
          <div className={css['contact-content-groop']} /*date*/>
            <label
              className={css['contact-content-label']}
              htmlFor="dateTransaction"
            >
              Date
            </label>
            <input
              className={css['contact-content-input']}
              type="date"
              name="dateTransaction"
              id="dateTransaction"
              // placeholder="Tony"
              // minLength={5}
              // pattern="^[a-zA-Z\s\.]{5,28}$"
              title="Name must contain at least 5 letters"
              aria-describedby="error-name"
              required
            />
            <span className={css['text-error']} id="error-name">
              Name must contain at least 5 letters
            </span>
          </div>
          <div className={css['contact-content-groop']} /*time*/>
            <label
              className={css['contact-content-label']}
              htmlFor="timeTransaction"
            >
              Time
            </label>
            <input
              className={css['contact-content-input']}
              type="time"
              name="timeTransaction"
              id="timeTransaction"
              // placeholder="Tony"
              // minLength={5}
              // pattern="^[a-zA-Z\s\.]{5,28}$"
              title="Name must contain at least 5 letters"
              aria-describedby="error-name"
              required
            />
            <span className={css['text-error']} id="error-name">
              Name must contain at least 5 letters
            </span>
          </div>
        </div>
        <div className={css['contact-content-groop']} /*category*/>
          <label
            className={css['contact-content-label']}
            htmlFor="categoryTransaction"
          >
            Category
          </label>
          <select
            className={css['contact-content-input']}
            name="categoryTransaction"
            id="categoryTransaction"
            // placeholder="+1 234 567 8900"
            // pattern="^\+[0-9\s]{12}$"
            // title="Enter a valid phone number"
            // aria-describedby="error-phone"
            required
          >
            <option value="" selected disabled hidden>
              Different
            </option>
            <option value="firstGroopTransaction">FirstGroopTransaction</option>
            <option value="secondGroopTransaction">
              SecondGroopTransaction
            </option>
            <option value="thirdGroopTransaction">ThirdGroopTransaction</option>
          </select>
          <span className={css['text-error']} id="error-phone">
            Enter a valid phone number
          </span>
        </div>
        <div className={css['contact-content-groop']} /*sum*/>
          <label
            className={css['contact-content-label']}
            htmlFor="sumTransaction"
          >
            Sum
          </label>
          <input
            className={css['contact-content-input']}
            type="number"
            name="sumTransaction"
            id="sumTransaction"
            placeholder="Enter the sum"
            // minLength={5}
            // pattern="^[a-zA-Z\s\.]{5,28}$"
            title="Name must contain at least 5 letters"
            aria-describedby="error-name"
            required
          />
        </div>
        <div className={css['contact-content-groop']} /*comment*/>
          <label
            className={css['contact-content-label']}
            htmlFor="commentTransaction"
          >
            Comment
          </label>
          <textarea
            className={
              css['contact-content-input'] + css['contact-content-textarea']
            }
            name="commentTransaction"
            id="commentTransaction"
            placeholder="Enter the text"
            // minLength={5}
            // pattern="^[a-zA-Z\s\.]{5,28}$"
            title="Name must contain at least 5 letters"
            aria-describedby="error-name"
            required
          ></textarea>
        </div>
        <button className={css['contact-content-submit']} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
