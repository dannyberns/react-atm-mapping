import React, { useContext } from "react";
import DispatchContext from "../DispatchContext";

function Filter() {
  const appDispatch = useContext(DispatchContext);
  function handleCommissionCheckbox(e) {
    if (e.target.checked) {
      appDispatch({ type: "CommissionOff" });
    } else {
      appDispatch({ type: "CommissionOn" });
    }
  }
  function handleAccessibleCheckbox(e) {
    if (e.target.checked) {
      appDispatch({ type: "AccessibleOn" });
    } else {
      appDispatch({ type: "AccessibleOff" });
    }
  }

  function handleNameChange(e) {
    const filterName = e.target.value;
    appDispatch({ type: "bankNameFilterOn", value: filterName });
  }
  return (
    <ul className="filter-list d-flex flex-row justify-content-around">
      <li>
        <select
          name="banks"
          id="banks"
          className="banks"
          dir="rtl"
          onChange={handleNameChange}
        >
          <option value=""> </option>
          <option value="בנק אגוד">אגוד</option>
          <option value="בנק אוצר החייל">אוצר החייל</option>
          <option value="בנק דיסקונט">דיסקונט</option>
          <option value="בנק הבינלאומי הראשון">הבינלאומי הראשון</option>
          <option value="בנק הפועלים">הפועלים</option>
          <option value="בנק יהב">יהב</option>
          <option value="בנק ירושלים">ירושלים</option>
          <option value="בנק לאומי">לאומי</option>
          <option value="מזרחי טפחות">מזרחי טפחות</option>
          <option value="בנק מסד">מסד</option>
          <option value="בנק מרכנתיל דיסקונט">מרכנתיל</option>
          <option value="פועלי אגודת ישראל">פועלי אגודת ישראל</option>
          <option value="יובנק">יובנק</option>
        </select>
        <label htmlFor="banks" className="banks-label banks">
          {" "}
          :בנק{" "}
        </label>
      </li>
      <label>
        <li>
          ללא עמלה <input type="checkbox" onClick={handleCommissionCheckbox} />
        </li>
      </label>
      <label>
        <li>
          נגיש <input type="checkbox" onClick={handleAccessibleCheckbox} />
        </li>
      </label>
    </ul>
  );
}

export default Filter;
