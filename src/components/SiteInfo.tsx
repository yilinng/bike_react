import { useState, useEffect } from "react";

import CheckBox from "./CheckBox";
import List from "./List";
import bikeService from "../services/bikes";
import Spinner from "../ui/Spinner";

const allToppings = [{ sarea: "Golden Corn", checked: false }];

const allBtns = [
  { name: "selectAll", checked: true },
  { name: "unSelectAll", checked: false },
];

const SiteInfo = ({ width }) => {
  const [toppings, setToppings] = useState(allToppings);
  const [pickCity, setPickCity] = useState("taipei");
  const [bikes, setBikes] = useState([]);
  //checkbox filtered sites
  const [sites, setSites] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [relevantVal, setRelevantVal] = useState([]);
  const [clickBtns, setClickBtns] = useState(allBtns);

  const [loading, setLoading] = useState(false);

  const updateCheckStatus = (index) => {
    setToppings(
      toppings.map((topping, currentIndex) =>
        currentIndex === index
          ? { ...topping, checked: !topping.checked }
          : topping
      )
    );
  };

  const selectAll = (pickCityChange) => {
    console.log("pickCityChange", pickCityChange);
    const changeChecked = clickBtns.map((btns) => {
      //pickCity change  select All have to checked
      if (pickCityChange === true) {
        if (btns.name === "selectAll") {
          return { ...btns, checked: true };
        }
        return { ...btns, checked: false };
      }

      if (btns.name === "selectAll") {
        if (btns.checked) {
          return { ...btns, checked: false };
        }
        return { ...btns, checked: true };
      }
      return { ...btns, checked: false };
    });

    setClickBtns(changeChecked);

    if (clickBtns[0].checked) {
      return setToppings(
        toppings.map((topping) => ({ ...topping, checked: false }))
      );
    }
    setToppings(toppings.map((topping) => ({ ...topping, checked: true })));
  };

  const unSelectAll = () => {
    const changeChecked = clickBtns.map((btns) => {
      if (btns.name === "unSelectAll") {
        if (btns.checked) {
          return { ...btns, checked: false };
        }
        return { ...btns, checked: true };
      }
      return { ...btns, checked: false };
    });

    setClickBtns(changeChecked);

    setToppings(toppings.map((topping) => ({ ...topping, checked: false })));
  };

  const handleData = () => {
    const checkedList = toppings.filter((topping) => topping.checked === true);
    console.log("checkedList", checkedList);
    const checkedArea = checkedList.map((item) => {
      return item.sarea;
    });
    console.log("checkedArea", checkedArea);
    const result = bikes.filter((bike) => checkedArea.includes(bike.sarea));
    console.log("result", result);
    setSites([...result]);
  };

  const passToState = (data, inputVal) => {
    //https://www.geeksforgeeks.org/how-to-convert-set-to-array-in-javascript/
    const storeSet = new Set();
    if (pickCity === "taoyuan") {
      setBikes(data.result.records);

      data.result.records.map((topping) => {
        if (storeSet.has(topping.sarea)) {
          return;
        }
        storeSet.add(topping.sarea);
      });

      const setArr = [...storeSet];

      if (inputVal === true) {
        setRelevantVal([...setArr]);
        return;
      }

      setToppings(
        setArr.map((item) => {
          return { sarea: item, checked: true };
        })
      );
      setLoading(false);

      return;
    }

    setBikes(data);

    data.map((topping) => {
      if (storeSet.has(topping.sarea)) {
        return;
      }
      storeSet.add(topping.sarea);
    });

    const setArr = [...storeSet];

    if (inputVal === true) {
      setRelevantVal([...setArr]);
      return;
    }

    setToppings(
      setArr.map((item) => {
        return { sarea: item, checked: true };
      })
    );

    setLoading(false);
  };

  const fetchData = (data, inputVal) => {
    //When someone inserts a something in an input field
    if (inputVal !== true) {
      setLoading(true);
    }

    if (data === "taichung" || data === "newTaipei") {
      const getData = bikeService.getAll({ data });
      console.log("getData", getData);

      passToState(getData.retVal, inputVal);

      return;
    }

    bikeService.getAll({ data }).then((response) => {
      passToState(response.data, inputVal);
    });
  };

  const handleSearch = () => {
    //search by city
    if (searchVal) {
      const findLabelByVal = bikeService.options.find(
        (option) =>
          option.value.toLowerCase().includes(searchVal.toLowerCase()) ||
          option.label.includes(searchVal)
      );
      //  { value: "taipei", label: "台北市" }
      if (findLabelByVal) {
        //change select value
        setPickCity(findLabelByVal.value);

        return fetchData(findLabelByVal.value);
      }
      // console.log("searchVal", searchVal);
      //search by areas or sites
      const result = bikes.filter(
        (bike) => bike.sarea.includes(searchVal) || bike.sna.includes(searchVal)
      );
      // console.log("handleSearch", result);
      setSites([...result]);
    }
  };

  const searchInputList = () => {
    console.log("searchVal", searchVal);
    const findLabelByVal = bikeService.options.find(
      (option) =>
        option.value.toLowerCase().includes(searchVal.toLowerCase()) ||
        option.label.includes(searchVal)
    );
    //  { value: "taipei", label: "台北市" }
    if (findLabelByVal) {
      //should display relevant to searchVal
      return fetchData(findLabelByVal.value, true);
    }
    //search by areas or sites
    const result = bikes.filter(
      (bike) => bike.sarea.includes(searchVal) || bike.sna.includes(searchVal)
    );
    console.log("searchInputList", result);
    setRelevantVal([...result]);
  };

  //https://bobbyhadz.com/blog/react-wait-for-state-to-update
  useEffect(() => {
    handleData(pickCity);
  }, [toppings]);

  useEffect(() => {
    //checked selectAll
    selectAll(true);
    fetchData(pickCity);
  }, [pickCity]);

  useEffect(() => {
    if (searchVal) {
      return searchInputList();
    }
    setRelevantVal([]);
  }, [searchVal]);

  useEffect(() => {
    console.log("relevantVal", relevantVal);
  }, [relevantVal]);

  useEffect(() => {
    fetchData(pickCity);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="SiteInfo">
      <CheckBox
        toppings={toppings}
        pickCity={pickCity}
        setPickCity={setPickCity}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        relevantVal={relevantVal}
        updateCheckStatus={updateCheckStatus}
        selectAll={selectAll}
        unSelectAll={unSelectAll}
        handleSearch={handleSearch}
        clickBtns={clickBtns}
      />
      <List sites={sites} pickCity={pickCity} />
    </div>
  );
};

export default SiteInfo;
