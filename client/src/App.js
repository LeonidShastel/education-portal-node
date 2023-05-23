import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import AllCourses, {AllCoursesLoader} from "./pages/AllCourses";
import Course from "./pages/Course";

function App() {
    // const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(false);
    // return (
    //     <Routes>
    //         <Route path={"/"} element={<Layout loading={loading}/>}>
    //             <Route index path={"/"}
    //                    element={<AllCourses setLoading={setLoading}
    //                    loader={AllCoursesLoader}
    //                    />}/>
    //             <Route path={"course/:id"} element={<Course/>}/>
    //         </Route>
    //     </Routes>
    // )
}

export default App;
