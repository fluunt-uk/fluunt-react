import React, {Component} from 'react'
import RTDatepicker from "../shared/RTDatepicker"
import {withRouter} from "react-router-dom"
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic"

import {connect} from 'react-redux'
import {updateAdvert, getAdvert} from "../../actions"
import Spinner from "../shared/Spinner";


class EditAdvert extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagetitle: 'Edit Advert',
            advert: {
                title: '',
                author: '',
                published_at: '',
                body: '',
            },
        }

        this.handleChangeRTDatepicker = this.handleChangeRTDatepicker.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.editAdvert = this.editAdvert.bind(this)
    }

    componentDidMount() {
        this.props.getAdvert(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            advert: nextProps.advert,
        })
    }


    editAdvert(event) {
        event.preventDefault()
        this.props.updateAdvert(this.props.match.params.id, this.state.advert, this.props)
    }

    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            advert: {
                ...this.state.advert,
                [name]: value,
            }
        })

    }

    handleChangeRTDatepicker(value) {
        this.setState({
            advert: {
                ...this.state.advert,
                published_at: value,
            }
        })
    }




    render() {

        if (this.props.loading) {
            return <Spinner/>
        }


        return (
            <div>
                <BreadcrumbsItem to='/adverts/:id/edit'>Edit Advert {this.state.advert.title}</BreadcrumbsItem>
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
                        <form onSubmit={this.editAdvert}>

                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input name="title" value={this.state.advert.title} type="text"
                                       className="form-control"
                                       id="title" placeholder="Enter title"
                                       onChange={this.changeHandler}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <input name="author" value={this.state.advert.author}
                                       type="text" className="form-control"
                                       id="author"
                                       placeholder="Enter author"
                                       onChange={this.changeHandler}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="published_at">Published at </label>
                                <RTDatepicker
                                    rtdName="published_at" rtdValue={this.state.advert.published_at}
                                    onChange={this.handleChangeRTDatepicker}
                                    rtdClassName="form-control"
                                    rtdPlaceholder="Enter date published" rtdAutoComplete="off"/>
                            </div>


                            <div className="form-group">
                                <label htmlFor="body">Description</label>
                                <textarea name="body" value={this.state.advert.body} className="form-control"
                                          id="body" rows="5" placeholder="Enter description"
                                          onChange={this.changeHandler}></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
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
        advert: state.advert.advert,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAdvert: (id) => dispatch(getAdvert(id)),
        updateAdvert: (id, advert, ownProps) => dispatch(updateAdvert(id, advert, ownProps)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditAdvert))
