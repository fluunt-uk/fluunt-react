import React, {Component} from 'react'
import Pagination from "react-js-pagination"
import {Link, withRouter} from 'react-router-dom'
import $ from 'jquery'
import RTDaterangepicker from "../shared/RTDaterangepicker"
import {AuthService} from "../../services/authService"
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'
import {getAdverts, deleteAdvert, rechercheAdverts, exportAdverts} from "../../actions"
import {connect} from 'react-redux'
import Spinner from "../shared/Spinner";


class ListAdvert extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagetitle: 'List Adverts',
            currentPage: 1,
            idAdvert: '',
            searchAdvert: {
                published_at: '',
                title: '',
                author: ''
            },
            activePage: 1,
            pageRangeDisplayed: 8,
            idSelectedAdvert: 0,
        }

        this.pageChange = this.pageChange.bind(this)
        this.showAdvert = this.showAdvert.bind(this)
        this.openModal = this.openModal.bind(this)
        this.deleteAdvert = this.deleteAdvert.bind(this)
        this.searchAdverts = this.searchAdverts.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.exportAdverts = this.exportAdverts.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.changeHandlerRTDaterangepicker = this.changeHandlerRTDaterangepicker.bind(this)
    }

    componentDidMount() {
        this.props.getAdverts(1)
    }


    pageChange(pageNumber) {
        this.props.getAdverts(pageNumber)
        this.setState({
            activePage: pageNumber
        })

    }


    showAdvert(id) {
        this.props.history.push('/adverts/' + id + '/show')
    }

    openModal(id) {
        this.setState({
            idSelectedAdvert: id
        })
    }

    deleteAdvert() {
        $('#exampleModal').modal('hide')
        this.props.deleteAdvert(this.state.idSelectedAdvert, this.state.activePage, this.props)
    }

    searchAdverts() {
        this.props.rechercheAdverts(this.state.searchAdvert)
    }

    resetForm(e) {
        e.preventDefault()
        this.setState({
            searchAdvert: {
                published_at: '',
                title: '',
                author: ''
            }
        }, function () {
            this.searchAdverts()
        })
    }

    exportAdverts(e) {
        e.preventDefault()
        const searchAdvert = {
            title: this.state.searchAdvert.title,
            published_at: this.state.searchAdvert.published_at,
            author: this.state.searchAdvert.author,
            export: true
        }
        this.props.exportAdverts(searchAdvert);
    }

    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            searchAdvert: {
                ...this.state.searchAdvert,
                [name]: value,
            }
        })
    }

    changeHandlerRTDaterangepicker(value) {
        this.setState({
            searchAdvert: {
                ...this.state.searchAdvert,
                published_at: value,
            }
        })
    }


    getDataAdverts() {
        let result
        if (this.props.adverts === undefined || this.props.adverts.total === undefined ||
            this.props.adverts.total === 0) {
            result = (
                <div className="row">
                    <div className="col-12 text-center">
                        <b> Empty Page </b>
                    </div>
                </div>
            )
        } else {


            result = (
                <div className="row">
                    {this.props.adverts.data.map(advert =>
                        <div className="col-4" key={advert.id}>
                            <div className="card">
                                <img className="card-img-top" src={advert.image} alt={advert.title}/>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {advert.title}
                                    </h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        Author: {advert.author}
                                    </h6>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Published at: {advert.published_at}
                                        </small>
                                    </p>
                                    <button type="button"
                                            className="btn btn-primary btn-sm mr-1"
                                            onClick={(e) => this.showAdvert(advert.id, e)}>
                                        <i className="fas fa-search"></i>
                                    </button>
                                    {AuthService.isRole('admin') ?
                                        <Link to={'/adverts/' + advert.id + '/edit'}
                                              className="btn btn-success btn-sm mr-1">
                                            <i className="far fa-edit"></i>
                                        </Link>
                                        : ''}

                                    {AuthService.isRole('admin') ?
                                        <button
                                            type="button" className="btn btn-danger btn-sm mr-1"
                                            data-toggle="modal" data-target="#exampleModal"
                                            onClick={(e) => this.openModal(advert.id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        : ''}

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        return result
    }

    getCountAdverts() {
        let nbreAdvert = 0

        if (this.props.adverts !== undefined && this.props.adverts.total !== undefined) {
            nbreAdvert = this.props.adverts.total
        }

        nbreAdvert = (
            <div className="row">
                <div className="col-12 mt-3 mb-3">
                    <b>Total : {nbreAdvert} adverts </b>
                </div>
            </div>
        )

        return nbreAdvert
    }

    pager() {
        let pager
        if (this.props.adverts !== undefined && this.props.adverts.total > this.props.adverts.per_page) {
            pager = (
                <div className="row mt-5">
                    <div className="col-12">
                        <Pagination
                            prevPageText='prev'
                            nextPageText='next'
                            firstPageText='first'
                            lastPageText='last'
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.props.adverts.per_page}
                            totalItemsCount={this.props.adverts.total}
                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                            itemClass="page-item"
                            linkClass="page-link"
                            innerClass="pagination justify-content-center"
                            onChange={this.pageChange}

                        />
                    </div>
                </div>
            )
        }
        return pager
    }



    render() {

        if (this.props.loading) {
            return <Spinner/>
        }

        return (

            <div>
                <BreadcrumbsItem to='/adverts'>List Adverts</BreadcrumbsItem>
                <div className="row">
                    <div className="col-12">
                        <div className="pb-2 mt-4 mb-2 border-bottom">
                            <h1>
                                {this.state.pagetitle}
                                <Link to="/adverts/add" className="btn btn-primary float-right">
                                    <i className="fas fa-plus"></i> Nouveau Advert
                                </Link>
                            </h1>
                        </div>
                    </div>
                </div>


                <div className="row filter-search">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                Recherche
                                <i className="fas search-icon fa-angle-down float-right"></i>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">

                                            <RTDaterangepicker
                                                rtdName="published_at"
                                                rtdValue={this.state.searchAdvert.published_at}
                                                rtdClassName="form-control" rtdPlaceholder="Published at"
                                                rtdFormatDate="MM/DD/YYYY"
                                                onChange={this.changeHandlerRTDaterangepicker}
                                            />

                                        </div>
                                        <div className="form-group col-md-4">
                                            <input type="text" name="title"
                                                   value={this.state.searchAdvert.title}
                                                   onChange={this.changeHandler}
                                                   className="form-control"
                                                   placeholder="Title"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <input type="text" name="author"
                                                   value={this.state.searchAdvert.author}
                                                   onChange={this.changeHandler}
                                                   className="form-control" placeholder="Author"/>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-end">
                                        <div className="form-group  col-sm-12 col-md-2">
                                            <button className="btn btn-secondary btn-block"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        this.searchAdverts()
                                                    }}>
                                                <i className="fas fa-search"></i> Recherche
                                            </button>
                                        </div>
                                        <div className="form-group   col-sm-12 col-md-2">
                                            <button className="btn btn-secondary btn-block"
                                                    onClick={this.resetForm}>
                                                <i className="fas fa-redo-alt"></i> Reset
                                            </button>
                                        </div>
                                        <div className="form-group col-sm-12 col-md-2">
                                            <button className="btn btn-secondary btn-block"
                                                    onClick={this.exportAdverts}>
                                                <i className="fas fa-file-excel"></i> Export
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {this.getCountAdverts()}
                    {this.getDataAdverts()}
                    {this.pager()}
                </div>

                {/*Modal*/}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Confirmation Delete Advert
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"> x </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete advert N° {this.state.idSelectedAdvert}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                        className="btn btn-primary" data-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-danger"
                                        onClick={this.deleteAdvert}>OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}


const mapStateToProps = state => {
    return {
        loading: state.spinner.loading,
        adverts: state.advert.adverts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAdverts: (nbrePage) => dispatch(getAdverts(nbrePage)),
        deleteAdvert: (id, nbrePage, ownProps) => dispatch(deleteAdvert(id, nbrePage, ownProps)),
        rechercheAdverts: (data) => dispatch(rechercheAdverts(data)),
        exportAdverts: (data) => dispatch(exportAdverts(data)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAdvert))
