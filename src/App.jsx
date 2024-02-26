import React, { useEffect, useState } from 'react'
import Auth from './components/Auth'
import { db, auth, storage } from './config/firebase'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

import "./App.css"
import { ref, uploadBytes } from 'firebase/storage'

const App = () => {
  const [movieList, setMovieList] = useState([])

  // For adding new movies
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newMovieOscar, setNewMovieOscar] = useState(false)
  const [newMovieReleaseDate, setNewtMovieReleaseDate] = useState(0)
  const [updatedMovieTitle, setUpdatedMovieTitle] = useState("")

  // refrence to the collection we want data from
  const moviesCollectionRefrence = collection(db, "movies");



  // file upload state
  const [fileUpload, setFileUpload] = useState(null)

  // Show movie function
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRefrence);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMovieList();
  }, [])


  // Add movie function
  const submitMovie = async () => {
    try {
      await addDoc(moviesCollectionRefrence, {
        title: newMovieTitle,
        oscar: newMovieOscar,
        releaseDate: newMovieReleaseDate,
        userId: auth?.currentUser?.uid
      })
      getMovieList();
    } catch (error) {
      console.error(error)
    }
  }

  // delete Movie
  const deleteMovie = async (selectedId) => {
    try {
      const movieDoc = doc(db, 'movies', selectedId);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.error(error)
    }
  }

  // update Movie
  const updateMovie = async (selectedId) => {
    try {
      const movieDoc = doc(db, 'movies', selectedId);
      await updateDoc(movieDoc, { title: updatedMovieTitle });
      getMovieList();
    } catch (error) {
      console.error(error)
    }
  }

  const submitFile = async () => {
    try {
      if (fileUpload == null) return
      const fileFolderRef = ref(storage, `projectFolder/${fileUpload.name}`);
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='app'>
      {/* Authentication */}
      <Auth />

      {/* Add Movies */}
      <div>
        <input type="text" placeholder="Title" value={newMovieTitle} onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input type="number" placeholder="Release Date" value={newMovieReleaseDate} onChange={(e) => setNewtMovieReleaseDate(e.target.value)} />
        <input type="checkbox" checked={newMovieOscar} onChange={(e) => setNewMovieOscar(e.target.checked)} />
        <input type="button" value="Submit" onClick={submitMovie} />
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={submitFile}>Upload</button>
      </div>

      {/* Display Movies */}
      <div>
        {movieList.map((movie) =>
          <>
            <hr />
            <h2>
              Title :{movie.title}
            </h2>
            <p>
              ID : {movie.id} <br />
              Oscar : {movie.oscar ? "yes" : "no"} <br />
              releaseDate : {movie.releaseDate} <br />
              creatorId : {movie.userId} <br />
              <button onClick={() => deleteMovie(movie.id)} >Delete</button>

              {/* update functionality */}
              <input type="text" placeholder='update title' onChange={(e) => setUpdatedMovieTitle(e.target.value)} />
              <button onClick={() => updateMovie(movie.id)}>Update</button>
            </p>
          </>)}
      </div>
    </div>
  )
}

export default App