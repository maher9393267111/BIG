
import { Button, Modal,Upload } from 'antd';
import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import {useAuth} from '../../context/index';
const PostModal = () => {

   
const  {isModalVisible,handleOk,handleCancel} = useAuth();


const [fileList, setFileList] = useState([]);
const [listNameFile, setListNameFile] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log('🔪🔪🔪🔪🔪🔪',newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };





    return (
        <div>
             <>
   
      <Modal title="Create Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    
  <ImgCrop rotate
  modalWidth={700}
  
  >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && '+ Open image'}
          </Upload>
        </ImgCrop> 


{/* ----post text area---- */}

        <textarea className='mt-12 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='What is on your mind?'></textarea>



      </Modal>
    </> 




        </div>
    );
}

export default PostModal;
