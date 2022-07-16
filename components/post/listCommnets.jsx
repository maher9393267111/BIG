import React from 'react';
import { useState, useEffect } from 'react';



const ListCommnets = ({comments}) => {
    return (
        <div>
            <div>
                

                {comments?.length}
            </div>
            
        </div>
    );
}

export default ListCommnets;
