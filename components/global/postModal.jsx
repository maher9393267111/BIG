
import { Button, Modal,Upload,message } from 'antd';
import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { createPost } from '../../utils/db';
import {MdDelete} from 'react-icons/md';
import {topics} from './data'
import {
    getDownloadURL,
    ref,
    uploadString,
    getStorage,
    uploadBytes,
    deleteObject,
   
  } from "firebase/storage";
  import {
    useCollectionData,
    useDocumentData,
    useCollection,
  } from "react-firebase-hooks/firestore";
  import { query, collection, orderBy,getFirestore,serverTimestamp,  addDoc,

    doc,

    updateDoc } from "firebase/firestore";
  import { db,app,storage } from "../../firebase"
  import { toast } from "react-toastify";
  import { FaCloudUploadAlt } from 'react-icons/fa';
import {useAuth} from '../../context/index';
import { info } from 'autoprefixer';

const PostModal = () => {

   
const  {isModalVisible,handleOk,handleCancel,userinfo} = useAuth();


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


  const [caption, setCaption] = useState('');

const [selecttype, setSelecttype] = useState('image');


  const [loading, setLoading] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
 const [wrongFileType, setWrongFileType] = useState(false);
  const [image, setImage] = useState({image:'',name:''});
 
const [videos, setVideos] = useState({video:'',name: ''});
const [deleted, setDeleted] = useState(false);
const [category, setCategory] = useState(topics[0]);

const info = () => {
    message.info(' file uploaded successfully');
  };
  
  const error = () => {
    message.error(' file upload failed');
    }



  const uploadVideo  = async (e) => {
console.log()
    const selectedFile = e.target.files[0];

console.log('✅✅✅',selectedFile);

const file = e.target.files[0];

console.log(file);
// generate a random string
const filename = file?.name;
// console.log("🕊️ 🕊️ 🕊️ 🕊️", filename);

const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

if(fileTypes.includes(selectedFile.type)) {

const testRef = ref(storage, `${userinfo.name}/${selecttype}/${filename}`);

await uploadBytes(testRef, file).then((snapshot) => {
  console.log(`Uploaded ${selecttype} to storage success!`);
  info()
});

// get image url from storage and set into state
const down = await getDownloadURL(testRef);
//setproductimage(down);

 


    setVideos( { video: down, name: filename });

    setWrongFileType(false);

}

else{
    setWrongFileType(true)
    await message.error('wrong video file type');
}



  }


  const uploadImage = async (e) => {
    
    console.log('uplaod----->🎭🎭')
    
    const selectedFile = e.target.files[0];


    const fileTypes = [ 'image/svg', 'image/png', 'image/jpeg' ];


    console.log('🚀🚀🚀🚀',selectedFile);
    
    const file = e.target.files[0];
    console.log(file);
    // generate a random string
    const filename = file?.name;
    
    

    if(fileTypes.includes(selectedFile.type)) {
    const testRef = ref(storage, `${userinfo.name}/${selecttype}/${filename}`);
    
    await uploadBytes(testRef, file).then((snapshot) => {
      console.log(`Uploaded ${selecttype} to storage success!`);
      info()
    });
    
    // get image url from storage and set into state
    const down = await getDownloadURL(testRef);
    //setproductimage(down);
 
        setImage({image:down,name:filename})
    

        await    message.success('file image uploaded successfully');
        setWrongFileType(false);
}

else {

    setWrongFileType(true);
    await message.error('error file type');
}
      
    
    
    
      }
    




// Delete the image from storage

const deleteImage = async () => {



    const desertRef = ref(storage, `${userinfo.name}/${selecttype}/${selecttype === 'image' ? image.name : videos.name}`);
    // console.log("🕊️ 🕊️ 🕊️ 🕊️", photoname);

setLoading(true);

    await deleteObject(desertRef)
      .then(() => {
        "Deleted! ";
        message.info("Deleted Successfully");
        setDeleted(true);
      }).then(() => {
        // filter out the deleted image
        toast.success("Deleted  Successfully");
        selecttype === 'image' ? setImage({image:'',name:''}) : setVideos({video:'',name:''});
    
        console.log("video ---->", videos);
      }).catch((error) => {
      //  console.log("Uh-oh, an error occurred!");
        message.error("Error Deleting");
        setLoading(false);
        setDeleted(false);
      })
      setLoading(false);
     
  };


// create a new post

const handlePost = async () => {

    
      
    
    const postdata = {
      postedby: userinfo.name,
      potedbyEmail: userinfo.email,
      postedbyImage: userinfo.image,
      postedbyId: userinfo.id,
        caption: caption,
        topic: category,
        cretedAt: Date.now(),
       
        videos: videos || '',
        image: image || '',
   
     
   
      //description:values.product.description,
    };
    console.log(postdata);

    createPost(postdata).then(() => {
      setVideos({video:'',name: ''});
      setImage({image:'',name:''});
      //setTopic('')
      setCaption('');
    })




}






    return (
        <div>
             <>
   
      <Modal
      bodyStyle={{ height: '100vh' }}
      
      title="Create Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    
  

{/* ----post text area---- */}
<>

<div className='flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
      <div className=' bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl font-bold'>
               <span
               onClick={()=> {setSelecttype('video')}}
               className='text-green-600 font-bold'>Upload Video  </span> 
            Or
            <span
             onClick={()=> {setSelecttype('image')}}
            className='  text-blue-700 font-bold ml-4'>Image</span>
             </p>
            <p className='text-md text-gray-400 mt-1'>Post a {selecttype} to your account</p>
          </div>
          <div className={ `   border-gray-200 flex flex-col justify-center items-center  outline-none mt-10  p-10 cursor-pointer ${ selecttype == 'image' ? 'w-[260px]' : 'border-dashed w-[260px]   rounded-xl border-4'} hover:border-red-300 h-[100px] hover:bg-gray-100`}>
            {loading ? (
              <p className='text-center text-3xl text-red-400 font-semibold'>
                Uploading...
              </p>
            ) : (
              <div>




                { selecttype === 'video' &&  
                
                ( <div>

              
                
               {  videos.name === '' ?  (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center '>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold relative top-[22px] text-xl'>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                      
                        <p className='bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select Video
                      </p>
                      </div>

                   
                    </div>
                    <input
                      type='file'
                      
                      name='upload-video'
                      onChange={(e) => uploadVideo(e)}
                      className='w-0 h-0'
                    />
                  </label>




                ) : (

                  <div className=' rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center'>
                



                    <div className=' flex justify-between gap-20'>
                      <p className='text-lg'>{videos.name}</p>
                      <button
                        type='button'
                        className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                        onClick={deleteImage}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                 
                )}
                 </div>)
                 
                 
                 
                 }




{/* -----if select type is image---- */}
{ selecttype === 'image' &&  
                
                ( <div>

              
                
               {  image.name === '' ?  (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center '>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold relative top-[22px] text-xl'>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                      
                        <p className='bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select Image
                      </p>
                      </div>

                   
                    </div>
                    <input
                      type='file'
                      name='upload-image'
                      onChange={(e) => uploadImage(e)}
                      className='w-0 h-0'
                    />
                  </label>




                ) : (

                  <div className=' rounded-3xl w-[300px]  p-4 flex flex-col gap-6 justify-center items-center'>
                



                    <div className=' flex justify-between gap-20'>
                      <p className='text-lg'>{image.name}</p>
                      <button
                        type='button'
                        className=' rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                        onClick={deleteImage}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                 
                )}
                 </div>)
                 
                 
                 
                 }


{/* ----wrong file type message ---- */}

{wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Please select valid file type
              </p>
            )}




              </div>
            )}
          </div>
       
        </div>
        <div className='flex flex-col gap-3 pb-10'>
          <label className='text-md font-medium '>Caption</label>
          <textarea
            type='text'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className='rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2'
          />
     

{/* -----select topic name ---- */}

<select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
              >
                {topics.map((topic) => (
                  <option
                    key={topic.id}
                    className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                    value={topic.name}
                  >
                    {topic.name}
                  </option>
                ))}
              </select>



         
          <div className='flex gap-6 mt-10'>
            <button
            //   onClick={handleDiscard}
              type='button'
              className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Discard
            </button>
            <button
             // disabled={video ? false : true}
               onClick={handlePost}
              type='button'
              className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              {savingPost ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>


</>
     



      </Modal>
    </> 




        </div>
    );
}

export default PostModal;
