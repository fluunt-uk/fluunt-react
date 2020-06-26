import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import RTDatepicker from "../shared/RTDatepicker"
import SimpleReactValidator from "simple-react-validator"
import {withNamespaces} from 'react-i18next'
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic"

import {connect} from 'react-redux'
import {addAdvert} from "../../actions"
import Spinner from "../shared/Spinner";

class CreateAdvert extends Component {

    constructor(props) {
        super(props)

        this.validator = new SimpleReactValidator({
            element: (message) =>
                <div className="invalid-feedback"><span>{message}</span></div>
        })

        this.state = {
            pagetitle: 'Add Advert',
            advert: {
                title: '',
                author: '',
                published_at: '',
                image: null,
                body: '',
            },
            touched: {
                title: false,
                author: false,
                published_at: false,
                image: false,
                body: false,
            }
        }

        this.handleChangeRTDatepicker = this.handleChangeRTDatepicker.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.onFileChanged = this.onFileChanged.bind(this)
        this.createAdvert = this.createAdvert.bind(this)

    }


    createAdvert(e) {
        e.preventDefault()

        if (this.validator.allValid()) {
            let advert = new FormData()
            advert.append('title', this.state.advert.title)
            advert.append('author', this.state.advert.author)
            advert.append('published_at', this.state.advert.published_at)
            advert.append('image', this.state.advert.image)
            advert.append('body', this.state.advert.body)
            this.props.addAdvert(advert, this.props)
        } else {
            this.validator.showMessages()
            this.forceUpdate()
        }
    }

    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            advert: {
                ...this.state.advert,
                [name]: value,
            },
            touched: {
                ...this.state.touched,
                [name]: true,
            }
        }, function () {
            this.validator.showMessages()
            this.forceUpdate()
        })

    }

    handleChangeRTDatepicker(value) {
        this.setState({
            advert: {
                ...this.state.advert,
                published_at: value,
            },
            touched: {
                ...this.state.touched,
                published_at: true,
            }
        })
    }

    onFileChanged(event) {
        this.setState({
            advert: {
                ...this.state.advert,
                image: event.target.files[0]
            }
        })
    }



    render() {

        const {t} = this.props

        const rulesValidation = {
            title: 'required|min:3',
            body: 'required|min:10',
            author: 'required',
            published_at: 'required',
            image: 'required',
        }

        if (this.props.loading) {
            return <Spinner />
        }

        return (
            <div>
                <BreadcrumbsItem to='/adverts/add'>Create Advert</BreadcrumbsItem>
                <div className="row">
                    <div className="col-12">
                        <div className="pb-2 mt-4 mb-2 border-bottom">
                            <h1>
                                {this.state.pagetitle}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={this.createAdvert}>
                            <div
                                className="form-group">
                                <label htmlFor="title"> {t('title')} </label>
                                <input name="title" value={this.state.advert.title} type="text"
                                       onChange={this.changeHandler}
                                       className={"form-control " + (this.state.touched.title ?
                                           (this.validator.fieldValid('title') ? 'is-valid' : 'is-invalid') : '')}
                                       id="title" placeholder="Enter title"/>


                                {(this.state.touched.title) ?
                                    this.validator.message('title', this.state.advert.title,
                                        rulesValidation.title) : ''}

                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="author"> {t('author')} </label>
                                <input name="author" value={this.state.advert.author} type="text"
                                       onChange={this.changeHandler}
                                       className={"form-control " + (this.state.touched.author ?
                                           (this.validator.fieldValid('author') ? 'is-valid' : 'is-invalid') : '')}
                                       id="author" placeholder="Enter author"/>
                                {(this.state.touched.author) ?
                                    this.validator.message('author', this.state.advert.author,
                                        rulesValidation.author) : ''}
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="published_at"> {t('published_at')} </label>
                                <RTDatepicker rtdName="published_at" rtdValue={this.state.advert.published_at}
                                              onChange={this.handleChangeRTDatepicker}
                                              rtdClassName="form-control"
                                              rtdPlaceholder="Enter date published" rtdAutoComplete="off"/>

                                {/*{this.validator.message('published_at', this.state.adverts.published_at,*/}
                                {/*rulesValidation.published_at)}*/}

                            </div>

                            <div className="form-group">
                                <label htmlFor="image">{t('image')} </label>
                                <input name="image" type="file" id="image" className={"form-control"}
                                       onChange={this.onFileChanged}/>
                                {/*{this.validator.message('image', this.state.adverts.image,*/}
                                {/*rulesValidation.image)}*/}
                            </div>

                            <div className="form-group">
                                <label htmlFor="body"> {t('description')} </label>
                                <textarea name="body" value={this.state.advert.body} id="body" rows="5"
                                          onChange={this.changeHandler}
                                          className={"form-control"}
                                          placeholder="Enter description"></textarea>
                                {/*{this.validator.message('body', this.state.adverts.body,*/}
                                {/*rulesValidation.body)}*/}
                            </div>
                            <button type="submit" className="btn btn-primary"
                                    disabled={!this.validator.allValid()}>
                                {t('submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.spinner.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAdvert: (advert, ownProps) => dispatch(addAdvert(advert, ownProps)),
    }
}


export default withNamespaces()(withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateAdvert)))
