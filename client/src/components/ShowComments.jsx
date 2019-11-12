import React from 'react'

const ShowComments = (props) => {
  console.log(props)
  return(
  <div>

    {props.allComments.map((comment)=>(
       <div >
          <div>Username </div>
          <div>{comment.username}</div>

          <div>content </div>
          <div>{comment.content}</div>
          <div>-----------------</div>

       </div>
    ))}
  </div>

  )
}

export default ShowComments