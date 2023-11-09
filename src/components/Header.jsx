import React from "react";
import Build from "./Build.jsx";
import { useSelector } from "react-redux";
import { Link, HistoryRouterProps } from "react-router-dom";

const Header = () => {

    const cost = useSelector((state) => state.equip.totalCost )
    const currBuild = {
        date: Date.now(),
        totalCost: cost,
        lensBuild: useSelector((state) => state.equip.lensBuild ),
        cameraBuild: useSelector((state) => state.equip.cameraBuild ),
        batteryBuild: useSelector((state) => state.equip.batteryBuild ),
        mediaBuild: useSelector((state) => state.equip.mediaBuild ),
        gripBuild: useSelector((state) => state.equip.gripBuild ),
        aksBuild: useSelector((state) => state.equip.aksBuild )
    }
    // const deciCost = () => {
    //     let temp = cost + '';
    //     console.log(temp)
    //     temp = temp.slice(0, -3) + ',' +  temp.slice(-3)
    //     return temp;
    // }

    //TODO: trying to get comma into cost again

    const goBack = () => {
        history.go(-1)
    }

    const saveBuild = () => {
        // const {
        //     lensBuild,
        //     cameraBuild,
        //     batteryBuild,
        //     mediaBuild,
        //     gripBuild,
        //     aksBuild
        // } = currBuild;
        //if i wanted all to be filled out

        if(currBuild.totalCost === 0) return;

        console.log('clicked')
        console.log('inside: ', currBuild)
        fetch(`/saveBuild`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(currBuild)
        })
        .then(res => res.json())
        .then((res)  => { //an array of product objects
            console.log('Back from Server, heres the new build:')
            console.log(res)
            // setData(res);
        })
    }

    return(
        <div id="header">
            <div id='top'>
            </div>
            <Build />
            <div id='bottom'>
                <button onClick={goBack} className="button">Back</button> 
                <h4>Cost: ${cost}</h4>
                <button onClick={saveBuild} className="button">+</button>
            </div>
        </div>
    );
}

export default Header;