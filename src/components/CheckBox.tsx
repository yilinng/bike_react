import { useState, useEffect, useRef } from "react";
import bike from "../assets/bike.svg";
import bikeService from "../services/bikes";
import Select from "react-select";

/*
https://react-select.com/styles
https://stackoverflow.com/questions/52614304/react-select-remove-focus-border 
*/
const style = {
  control: (base, state) => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: "none",
    backgroundColor: "f6f6f6",
    color: state.isSelected ? "b5cc22" : "eee",
  }),
};

const SelectList = ({ pickCity, setPickCity }) => {
  const handleVal = (data) => {
    console.log("handleVal", data);
    setPickCity(data.value);
  };
  return (
    <div className="selectList">
      <Select
        className="selectBox"
        options={bikeService.options}
        onChange={handleVal}
        placeholder="選擇縣市"
        styles={style}
      />
    </div>
  );

  /*
  return (
    <div className="selectList">
      <select
        className="selectBox"
        value={pickCity}
        onChange={(e) => setPickCity(e.target.value)}
      >
        {bikeService.options.map((option) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
  */
};

const SearchInput = ({
  setSearchVal,
  searchVal,
  handleSearch,
  relevantVal,
}) => {
  return (
    <div className="searchDiv">
      <div className="searchInputDiv">
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="搜尋站點..."
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="24"
          height="24"
          className="searchIcon"
          onClick={handleSearch}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      <SearchList relevantVal={relevantVal} />
    </div>
  );
};

const SearchList = ({ relevantVal }) => {
  return (
    <ul className="searchList_ul">
      {relevantVal.map((site, idx) => (
        <li key={idx} className="searchList_li">
          {site.sna.includes("YouBike2.0_") ? site.sna.slice(11) : site.sna}
        </li>
      ))}
    </ul>
  );
};

const CheckItemBox = ({ isChecked, label, checkHandler, index }) => {
  return (
    <div className="checkItemBox">
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor={`checkbox-${index}`}>{label}</label>
    </div>
  );
};

const SelectBoxList = ({ selectAll, unSelectAll, clickBtns }) => {
  return (
    <div className="clickBtn">
      <div className="selectAllBox">
        <input
          type="checkbox"
          onChange={selectAll}
          checked={clickBtns[0].checked}
        />
        <label htmlFor="selectAll">全部勾選</label>
      </div>

      <div className="unSelectAllBox">
        <input
          type="checkbox"
          onChange={unSelectAll}
          checked={clickBtns[1].checked}
        />
        <label htmlFor="unSelectAll">全部取消</label>
      </div>
    </div>
  );
};

const CheckBox = ({
  toppings,
  pickCity,
  setPickCity,
  searchVal,
  setSearchVal,
  relevantVal,
  updateCheckStatus,
  selectAll,
  unSelectAll,
  handleSearch,
  clickBtns,
}) => {
  return (
    <div className="checkBox_container">
      <div className="checkBox">
        <h3>站點資訊</h3>

        <div className="actionList">
          <SelectList pickCity={pickCity} setPickCity={setPickCity} />

          <SearchInput
            setSearchVal={setSearchVal}
            searchVal={searchVal}
            handleSearch={handleSearch}
            relevantVal={relevantVal}
          />
        </div>

        <SelectBoxList
          selectAll={selectAll}
          unSelectAll={unSelectAll}
          clickBtns={clickBtns}
        />

        <div className="checkListBox">
          {toppings.map((topping, index) => (
            <CheckItemBox
              key={topping.sarea}
              isChecked={topping.checked}
              checkHandler={() => updateCheckStatus(index)}
              label={topping.sarea}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="bike_img">
        <img src={bike} alt="bike" />
      </div>
    </div>
  );
};

export default CheckBox;
