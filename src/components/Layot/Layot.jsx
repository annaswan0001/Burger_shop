import React from 'react'
import BurgerBuilder from '../../views/BurgerBuilder/BurgerBuilder'
import Checkout from '../../views/Checkout/Checkout'

export default function Layot(props) {
    return (
        <React.Fragment>
        <div>
            ToolBar, SideBar, Drawer
        </div>
        <main>
            <BurgerBuilder/>
        </main>
        </React.Fragment>
    )
}
