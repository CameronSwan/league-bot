const handleError = async (e, logger, closeClient = false) => {
    logger.error(e, {
        type:'SYSTEM',
    })
    if (!closeClient) return
    await new Promise(resolve => setTimeout(resolve, 500))
    logger.info('Client shutting down.', {
        type: 'SYSTEM',
    })
    process.exit(1)
}

module.exports = handleError