export const GET_PHOTO_REQUEST = 'GET_PHOTO_REQUEST'
export const GET_PHOTO_SUCCESS = 'GET_PHOTO_SUCCESS'
export const GET_PHOTO_FAIL = 'PHOTO_FAIL'

let photosArr = []
let cached = false

function sortPhotos(photos, selectedYear) {
  let createdYear,
    yearPhotos = []

  photos.forEach(item => {
    createdYear = new Date(item.date * 1000).getFullYear()
    if (createdYear === selectedYear) {
      yearPhotos.push(item)
    }
  })

  yearPhotos.sort((a, b) => b.likes.count - a.likes.count)

  return yearPhotos
}

function getMorePhotos(offset, count, year, dispatch) {
  //eslint-disable-next-line no-undef
  VK.Api.call(
    'photos.getAll',
    { extended: 1, count: count, offset: offset, v: '5.85' },
    r => {
      try {
        photosArr = photosArr.concat(r.response.items)
        if (offset <= r.response.count) {
          offset += 200
          getMorePhotos(offset, count, year, dispatch)
        } else {
          let photos = sortPhotos(photosArr, year)
          cached = true
          dispatch({
            type: GET_PHOTO_SUCCESS,
            payload: photos,
          })
        }
      } catch (e) {
        dispatch({
          type: GET_PHOTO_FAIL,
          payload: new Error(e),
        })
      }
    }
  )
}

export function getPhotos(year, id) {
  return dispatch => {
    dispatch({
      type: GET_PHOTO_REQUEST,
      payload: year,
    })
    if (cached) {
      let photos = sortPhotos(photosArr, year)
      dispatch({
        type: GET_PHOTO_SUCCESS,
        payload: photos,
      })
    } else {
      getMorePhotos(0, 200, year, dispatch)
    }
  }
}
