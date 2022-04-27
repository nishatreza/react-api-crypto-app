import { Navigate } from 'react-router-dom'
// import './css/customProfile.css';
// import './js/scripts.js';
import './js/datatables-simple-demo.js'
import './css/styles.css'
// import { useEffect } from 'react';
// import { Helmet } from "react-helmet";
// import React, { useEffect, useState } from "react";
import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios'
// import { getWithExpiry } from "../../helper/utils";
import { Link } from 'react-router-dom'
import DashboardNavbar from './base/DashboardNavbar'
import DashboardLayoutSideNav from './base/DashboardLayoutSideNav.js'
import Cookies from 'js-cookie'
import MarketList from './MarketList.js'
import { defaultAPI } from '../../api/api.js'

const Market = ({ user, setUser }) => {
    const [marketDetails, setMarketDetails] = useState([])

    useEffect(() => {
        let isMounted = true

        async function getMarketData() {
            // const res = await fetch(`${defaultAPI.api.tradeUrl}/public/markets`)
            const res = await fetch(`${defaultAPI.api.tradeUrl}/public/markets/tickers`)

            const data = await res.json()
            if (isMounted) setMarketDetails(data)
        }
        getMarketData()

        return () => {
            isMounted = false
        }
    }, [])

    // var tifOptions = Object.keys(marketDetails).map(function ([key, value]) {
    //     // return <option value={key}>{marketDetails[key]}</option>
    //     // console.log(marketDetails[key].ticker.high);
    //     // console.log(marketDetails[0]);
    //     console.log(key);


    // });

    const markets = Object.entries(marketDetails).map(([key, value]) => {

        return (
            <MarketList
                key={key}
                last={value.ticker.last}
                price_change_percent={value.ticker.price_change_percent}
                high={value.ticker.high}
                low={value.ticker.low}
                volume={value.ticker.volume}

            />
        )
        // console.log(key);
        // console.log(value.ticker.avg_price);


    }
        // <div key={key}>{value}</div>

    );

    // console.log(marketDetails);

    // const markets = marketDetails.map((market) => {
    //     return (
    //         <MarketList
    //             key={market.id}
    //             name={market.name}
    //             max_price={market.max_price}
    //             min_amount={market.min_amount}
    //             min_price={market.min_price}
    //         />
    //     )
    // })

    if (!user) return <Navigate to="/login" />

    return (
        <div>
            <div className="sb-nav-fixed profilediv">
                <DashboardNavbar user={user} setUser={setUser} />

                <div id="layoutSidenav">
                    <DashboardLayoutSideNav />
                    <div id="layoutSidenav_content">
                        {/* <h1>{JSON.stringify(marketDetails)}</h1> */}
                        <main>
                            <div className="container-fluid px-4">
                                {/* All market details*/}

                                <div className="row mt-4 profile-list-row">
                                    <div className="col-xl-12 col-md-12 profile-list-div card">
                                        <ul className="list-group card-body">
                                            <li
                                                className="list-group-item list-group-item-dark"
                                                aria-current="true"
                                            >
                                                All Market Items
                                            </li>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            Market
                                                        </th>
                                                        <th scope="col">
                                                            Last Price
                                                        </th>
                                                        <th scope="col">
                                                            24 Change
                                                        </th>
                                                        <th scope="col">
                                                            24 High
                                                        </th>
                                                        <th scope="col">
                                                            24 Low
                                                        </th>
                                                        <th scope="col">
                                                            24 Volume
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>{markets}</tbody>
                                            </table>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Market
