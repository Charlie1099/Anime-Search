export const getSavedShowIds = () => {
    const savedShowIds = localStorage.getItem("saved_shows")
    ? JSON.parse(localStorage.getItem("saved_shows"))
    : []

    return savedShowIds
}

export const saveShowIds = (showIdArr) => {
    if (showIdArr.length) {
        localStorage.setItem("saved_shows", JSON.stringify(showIdArr))
    } else {
        localStorage.removeItem("saved_shows")
    }
}

export const removeShowId = (showId) => {
    const savedShowIds = localStorage.getItem("saved_shows")
    ? JSON.parse(localStorage.getItem("saved_shows"))
    : null

    if (!savedShowIds) {
        return false
    }

    const updateSavedShowIds = savedShowIds?.filter((savedShowId) => savedShowId !== showId)
    localStorage.setItem("saved_show", JSON.stringify(updateSavedShowIds))

    return true
}