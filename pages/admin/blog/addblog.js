import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor } from '@tinymce/tinymce-react';

const AddBlog = () => {
  const [body, settiny] = useState('')
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [bcody, setBody] = useState('')
  const [imageinput, setImageInput] = useState(null)
  const [description, setdescription] = useState('')
  const [issubmitting, setissubmitting] = useState(false)
  const [issubmitted, setissubmitted] = useState(false)
  const [normal, setnormal] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkuser = JSON.parse(localStorage.getItem('token'))
    if (!checkuser) {
      router.push('/admin/login')
    }
  })

  const handlechange = (content, editor) => {
      settiny(content)
  };

  const handleblogChange = (e)=>{
    if(e.target.name == 'title'){
      setTitle(e.target.value)
    }
    else if(e.target.name == 'slug'){
      setSlug(e.target.value)
    }
    else if(e.target.name == 'image'){
      setImage(e.target.value)
    }
    else if(e.target.name == 'body'){
      setBody(e.target.value)
    }
    else if(e.target.name == 'description'){
      setdescription(e.target.value)
    }
  }
  const handleImage = (e) =>{
    const file = e.target.files[0]
    setImageInput(file)
    const fileReader = new FileReader();
    fileReader.onload = function(e){
      setImage(e.target.result)
    }
    fileReader.readAsDataURL(file)
  }

  const handleblogSubmit = async (e) => {
    e.preventDefault()
    const data = {image, title, slug, description, body}

    let res = await fetch(`${process.env.NEXT_BASE_PUBLIC_URL}/api/addblog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    // setEmail('')
    // setPassword('')
    if(response.success){
      toast.success(response.success, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.error(response.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div>
    <Head>
      <title>Add Blog</title>
    </Head>
    <ToastContainer />
    <div className="blog-container">
      <div className="blog">
        <div className='blog-form'>
        <h1>Add Blog</h1>
        <form onSubmit={handleblogSubmit} id="blogform" method='POST'>
          {/* <div className="form-field">
            <label htmlFor="image">Image</label>
            <input value={image} onChange={handleImage} type="text" name='image' id='image' required />
            {image && <img src={image} style={{width: '200px'}} />}
          </div> */}
          <div className="form-field">
            <label htmlFor="image">Image</label>
            <input 
            onChange={handleImage} 
            type="file" 
            name='image' 
            id='image' 
            accept='.jpg, .png, .jpeg'
            required />
            <h1>Preview:</h1>
            {image && <img src={image} style={{width: '200px'}} />}
          </div>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input value={title} onChange={handleblogChange} type="text" name='title' id='title' required />
          </div>
          <div className="form-field">
            <label htmlFor="slug">Slug</label>
            <input value={slug} onChange={handleblogChange} type="text" name='slug' id='slug' required />
          </div>
          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea value={description} onChange={handleblogChange} name="description" id="description" cols="30" rows="10"></textarea>
          </div>
          <div className="form-field">
            <label htmlFor="body">Body</label>
            <Editor
        id='2312'
        textareaName='body'
        value={body}
        onEditorChange={handlechange}

        // tinymceScriptSrc='http://localhost:3000/tinymce/tinymce.min.js'
        apiKey='qej88iq00gkxe0g8vo4zhsjo6s2seaxumoom2za4f2537cip'
        init={{
          height: 500,
          menubar: true,
          branding: false,
          plugins: 'preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export',
          editimage_cors_hosts: ['picsum.photos'],
          menubar: 'file edit view insert format tools table tc help',
          toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          autosave_interval: '30s',
          autosave_prefix: '{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          autosave_retention: '2m',
          image_advtab: true,
          images_upload_url: 'postAcceptor.php',
          link_list: [
            { title: 'My page 1', value: 'https://www.tiny.cloud' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_list: [
            { title: 'My page 1', value: 'https://www.tiny.cloud' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_class_list: [
            { title: 'None', value: '' },
            { title: 'Some class', value: 'class-name' }
          ],
          importcss_append: true,
          file_picker_callback: (callback, value, meta) => {
            /* Provide file and text for the link dialog */
            if (meta.filetype === 'file') {
              callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === 'image') {
              callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === 'media') {
              callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
            }
          },
          templates: [
            { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
            { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
          ],
          template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
          template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
          height: 600,
          image_caption: true,
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_class: 'mceNonEditable',
          toolbar_mode: 'sliding',
          contextmenu: 'link image editimage table',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
          tinycomments_mode: 'embedded',
          tinydrive_upload_path: '/public/other/path'
        }}
      />
          </div>
          <div className="form-field">
            {normal && <button className='blogsubmit' type='submit'>Add Blog</button>}
            {issubmitted && <button className='blogsubmit' disabled>Blog Added</button>}
            {issubmitting &&<button className='blogsubmit' disabled>Submitting</button>}
          </div>
        </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddBlog