import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';


function Beverages() {
    return (
        <>
            <header>
                <h1>Beverages</h1>
            </header>
            <ul data-cy="MenuCategoryList" className="menu" role="list">
                {categoryList}
            </ul>
        </>
    );
}

export default Beverages;