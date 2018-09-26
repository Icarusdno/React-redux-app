import React from 'react'
import PropTypes from 'prop-types'

export class Page extends React.Component {
  onBtnClick = e => {
    const year = +e.currentTarget.innerText
    this.props.getPhotos(year)
  }

  renderTemplate = () => {
    const { photos, isFetching, error } = this.props

    if (error) {
      return <p className="error">Ошибка, печалька</p>
    }

    if (isFetching) {
      return <p>Загрузка...</p>
    } else {
      return photos.map(photo => (
        <div key={photo.id} className="photo">
          <p>
            <img src={photo.sizes[0].url} alt="" />
          </p>
          <p>{photo.likes.count} ❤</p>
        </div>
      ))
    }
  }

  render() {
    const { photos, year } = this.props

    return (
      <div className="ib page">
        <p>
          <button className="btn" onClick={this.onBtnClick}>
            2018
          </button>{' '}
          <button className="btn" onClick={this.onBtnClick}>
            2017
          </button>{' '}
          <button className="btn" onClick={this.onBtnClick}>
            2016
          </button>{' '}
          <button className="btn" onClick={this.onBtnClick}>
            2015
          </button>{' '}
          <button className="btn" onClick={this.onBtnClick}>
            2014
          </button>
        </p>
        <h3>
          {year} год [{photos.length}]
        </h3>
        {this.renderTemplate()}
      </div>
    )
  }
}

Page.proptypes = {
  year: PropTypes.number.isRequired,
  phones: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}
