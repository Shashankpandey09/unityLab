import { useState,useEffect } from 'react';
import {format} from 'date-fns'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('programming');
  const [text, setText] = useState('');
  const [largeTitle, setLargeTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchArticles = async () => {
      const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
      const data = await res.json();
      console.log(data.hits);
      setItems(data.hits);
      setLargeTitle(data.hits[0]);
    };

    fetchArticles();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [query]);
 const handleSubmit=(e)=>{
  e.preventDefault();
  if(!text){
    toast("Input is Empty")
  }
  else{
    setQuery(text);
    setText('');
  }
 }
  return (
    <section className='section'>
      <form autoComplete='off'onSubmit={handleSubmit}>
        <input type="text" name='search' id='search' value={text} onChange={(e)=>setText(e.target.value)} placeholder='Search for something' />
        <button>Search</button>
      </form>
      <ToastContainer position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"/>
      {isLoading ? (
        <div className='spinner'></div>
      ) : (
        <>
          <article className='title'>
            <h1>{largeTitle.title}</h1>
            <a href={largeTitle.url} target='_blank' rel='noreferrer'>
              Read full article
            </a>
          </article>
          <p style={{marginBottom:'1rem',color:'white'}}>Category: <span style={{fontWeight:'bold',textTransform:'capitalize'}}>{query}</span></p>
          <article className='cards'>
            {items.map((item) => {
              const { author, created_at, title, url, objectID } = item; // Changed objectId to objectID
              return (
                <div key={objectID}>
                  <h2>{title}</h2>
                  <ul>
                    <li>By {author}</li>
                    <li>
                      <a href={url} target='_blank' rel='noreferrer' style={{color:'red'}}>
                        Read Full Article
                      </a>
                    </li>
                  </ul>
                  <p>{format(new Date(created_at), 'MMMM d, yyyy h:mm a')}</p> {/* Added date formatting */}
                </div>
              );
            })}
          </article>
        </>
      )}
    </section>
  );
};

export default App;

