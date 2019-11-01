# SoundClout Information and Comments Module

***Artist, Track Information and Comments for the SoundClout App***

This module consists of information about the artist and track as well as the ability to infinitely scroll through comments and post comments that reference a time within the displayed track.


## Related Projects

- https://github.com/AirCloudy/song-display
- https://github.com/AirCloudy/playbar
- https://github.com/AirCloudy/Related-Tracks

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [API Call](#apicall)
1. [Development](#development)

## Usage

The user will be able to view track and artist information, post comments, like and repost tracks and comments.

## API Call


### POST
POST /song
- Add a new song under the song collection
- Data goes in the body

POST /song/:song_id/comments
- Add a comment in the comments collection for the specific song
- Data goes in the body

### GET

#### GET /song/:song_id
Get the song with id

**Response**

| Name | Type | Description |
| ---- | ---- | ----------- |
| 'song_id' | 'int' | _Required_. Identifier for song. |
| 'song_name' | 'str' | _Required_. Name of song. |
| 'artist_id' | 'int' | _Required_. Identifier for song artist. |
| 'release_date' | 'str' | _Required_. Release date of song. |
| 'P-line' | 'str' | _Required_. Owner to rights of sound recording. |
| 'C-line' | 'str' | _Required_. Copyright of the music. |
| 'language_rating' | 'str' | _Required_. Rates the song. |

GET /song/:song_id/comments
- Get all the comments for specific song id

#### GET /song/:song_id/comments/:comment_id
Get the specific comment from the specific song
**Response**
| Name | Type | Description |
| ---- | ---- | ----------- |
| 'comment_id' | 'int' | _Required_. Identifier for comment. |
| 'song_id' | 'int' | _Required_. Identifier for which song this comment belongs to. |
| 'user_id' | 'int' | _Required_. Identify which user wrote the comment |
| 'content' | 'str' | _Required_. Comment content. |
| 'time' | 'int' | _Required_. Timestamp for comment. |
| 'track_time' | 'int' | _Reuiqred_. Track time stamp for comment. |

### DELETE
DELETE /song
- delete all songs

DELETE /song/:song_id
- delete specific song

DELETE /song/:song_id/comments
- delete all comments from specific song

DELETE /song/:song_id/comments/:comment_id/
- delete specific comment from specific song


### PATCH
PATCH /song/:song_id'
- update specific song
- Data goes in the body

PATCH /song/:song_id/comments/:comment_id
- update specific comment from specific song
- Data goes in the body


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```


