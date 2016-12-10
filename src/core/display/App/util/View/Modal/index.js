import React from 'react'
import Modal from 'react-modal'
import {Link, withRouter} from 'react-router'
import {compose, withState, withProps, lifecycle, withHandlers, withContext, getContext} from 'recompose'

import styles from './modal.css'

const modalContext = {
  isModal: React.PropTypes.bool,
  previousChildren: React.PropTypes.node,
  closeModal: React.PropTypes.func
}

export const pageWithModal = (modalId = '') => compose(
  withState('previousChildren', 'setPreviousChildren', null),
  withState('previousPath', 'setPreviousPath', null),
  withHandlers({
    shouldBeModal: () => (location) => location.state && location.state.modal && location.state.modalId === modalId
  }),
  withProps((props) => ({
    isModal: props.previousChildren && props.shouldBeModal(props.location)
  })),
  lifecycle({
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.location.key !== this.props.location.key && this.props.shouldBeModal(nextProps.location)) {
        if (!this.props.isModal) {
          this.props.setPreviousChildren(this.props.children)
          this.props.setPreviousPath(this.props.location.pathname)
        }
      }
    }
  }),
  withRouter,
  withHandlers({
    closeModal: ({router, previousPath}) => () => router.push(previousPath)
  }),
  withContext(
    modalContext,
    (props) => {
      return ({
        isModal: props.isModal,
        previousChildren: props.previousChildren,
        closeModal: props.closeModal
      })
    }
  )
)

export const ChildrenInContext = (
  getContext(modalContext)
)(({closeModal, isModal, previousChildren, children}) => {
  let modal = null
  if (isModal) {
    modal = <Modal isOpen onRequestClose={closeModal} className={styles.modal} overlayClassName={styles.overlay}>
      {children}
    </Modal>
  }

  return <div>
    {isModal ? previousChildren : children}
    {modal}
  </div>
})

export const ModalLink = ({to, className, children, modalId = ''}) => <Link to={{
  pathname: to,
  state: {modal: true, modalId}
}} className={className}>
  {children}
</Link>
