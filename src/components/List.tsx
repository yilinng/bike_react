import { useState } from "react";
import bikeService from "../services/bikes";

const List = ({ sites, pickCity }) => {
  const findLabelByVal = bikeService.options.find(
    (option) => option.value === pickCity
  );
  //  { value: "taipei", label: "台北市" }
  // console.log("list sites", sites[0]?.sna);
  return (
    <div className="sitesList">
      <table>
        <thead>
          <tr>
            <th>縣市</th>
            <th>區域</th>
            <th className="th_sna">站點名稱</th>
            <th>可借車輛</th>
            <th>可還空位</th>
          </tr>
        </thead>
        <tbody>
          {sites.length ? (
            sites.map((site) => (
              <tr className="siteItem" key={site.sno}>
                <td>{findLabelByVal.label}</td>
                <td>{site.sarea}</td>
                <td className="td_sna">
                  {site.sna.includes("YouBike2.0_")
                    ? site.sna.slice(11)
                    : site.sna}
                </td>
                <td>{site.sbi}</td>
                <td>{site.bemp}</td>
              </tr>
            ))
          ) : (
            <tr className="siteItem" key="1">
              <td></td>
              <td></td>
              <td className="td_sna"></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
