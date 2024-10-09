import { useAppSelector } from "./Store/Store"

const Modal = () => {
    const modal = useAppSelector(state => state.Modal)
    return (
        <>
        <div className="modal" tabIndex={0}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modal.text}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are You Sure ?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" >Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Modal
