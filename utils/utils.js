module.exports.rectifyOrderStatus = (status_) => {
    let rectifiedStatus = status_
    if (status_ == 'ready') { rectifiedStatus = 'ready for pickup' }
    else if (status_ == 'check in') { rectifiedStatus = 'checked in' }
    return rectifiedStatus
}