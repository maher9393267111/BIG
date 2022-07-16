import React from 'react';

const ReplayList = ({replay}) => {
    return (
        <div>
            
<div className='min-h-[120px]'>

<div className=" flex gap-4 mt-6">
                        <div>
                          <img
                            className=" w-[77px] h-[77px] rounded-full"
                            src={replay?.userImg}
                            alt=""
                          />
                        </div>

                        <div className=" mt-2 text-[17px] font-semibold">
                          <p>{replay?.name}</p>

                          <p className=" mt-2 tg">
                            reply{" "}
                            <span className=" text-blue-500">
                              @{replay?.replyto}
                            </span>{" "}
                          </p>
                        </div>

                        {/* ----comment text---- */}

                        <div>

                           
                        </div>
                      </div>

<div className=' ml-12'>

<p className="text-xl font-semibold">
                                {replay?.comment}
                            </p>
</div>




</div>



        </div>
    );
}

export default ReplayList;
