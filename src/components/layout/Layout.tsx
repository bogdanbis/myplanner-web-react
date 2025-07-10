import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div className="page-grid">
		<Header showSidebar={() => setShowSidebar(true)} />
		<div className="content">
			<div className={'sidebar-container ' + (showSidebar ? 'focused' : '')}>
				<Sidebar hideSidebar={() => setShowSidebar(false)} />
			</div>
			<div className="main-content" onClick={() => setShowSidebar(false)}>
				<Outlet />
			</div>
		</div>
	</div>
    )
}
