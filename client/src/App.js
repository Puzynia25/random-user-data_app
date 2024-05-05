import { useContext, useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import ArrowUp from "./components/ArrowUp";
import Spinner from "./components/Spinner";
import SelectMenu from "./components/SelectMenu";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import ExportCsvButton from "./components/ExportCsvButton";

const App = observer(() => {
    const { user } = useContext(Context);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = (e) => {
        if (
            !user.isFetching &&
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
                100
        ) {
            user.setIsFetching(true);
        }

        if (window.scrollY > 200) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const spinner = user.isFetching ? <Spinner /> : null;
    return (
        <div className="container mx-auto mt-10 w-full">
            <SelectMenu />
            <ExportCsvButton />
            <UserTable />
            {showScrollButton && <ArrowUp scrollToTop={scrollToTop} />}
            {spinner}
        </div>
    );
});

export default App;
