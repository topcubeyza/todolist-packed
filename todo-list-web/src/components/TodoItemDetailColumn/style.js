export const style = {
    main: {
        display: "flex",
        flexDirection: "column",
    },

    headerContainer: {
        paddingTop: "5%",
        paddingBottom: "5%",
        borderBottom:"1px solid grey"
    },

    bodyContainer: {
        paddingTop: "5%",
    },

    headerTextContainer: {
    },

    headerText: {
        color: "#d4d4d4",
        fontSize: "1.2rem",
        fontWeight: "bold"
    },

    headerPlusContainer: {
        display: "flex",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",

    },

    icon: {
        color: "grey",
        fontSize: "1.2rem",
        cursor: "pointer"
    },

    topRightIcon: {
        fontSize: "2rem",
        cursor: "pointer"
    },

    formGroup: {
        margin:0,
        padding: "0.2rem"
    },

    labelContainer: {
        color: "#d4d4d4",
        paddingLeft: 0
    },

    controlContainer: {
        display: "flex",
        alignItems: "center",
        paddingRight: 0
    },

    control: {
        backgroundColor: "transparent",
        color: "white"
    },

    toggler: {
        padding: "0.3rem 0",
        backgroundColor: "transparent",
        color: "#d4d4d4",
        cursor: "pointer"
    },

    hover: {
        cursor: "pointer",
        ":hover": {
            backgroundColor: "#4f5359"
        },
        
        borderBottom: "1px solid grey",
    },

    plusIcon: {
        cursor: "pointer",
        color: "#83ff4d",
        fontSize: "0.7rem",
        marginRight: "0.3rem"
    },

    editIcon: {
        cursor: "pointer",
        color: "orange",
        fontSize: "0.7rem",
        marginRight: "0.3rem"
    },

    accordionToggleRow: {

    },

    buttonsContainer: {
        position: "absolute",
        bottom: 20,
        left:0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    saveButton: {
        width: "80%",
        marginRight: "0.5rem",
        marginLeft: "0.5rem"
    },

    buttonsRow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    button: {
        width: "40%",
        marginRight: "0.5rem",
        marginLeft: "0.5rem"
    },

    errorMessage: {
        paddingBottom: "0.3rem",
        color: "orange",
        fontSize: "0.8rem"
    },

    successMessage: {
        paddingBottom: "0.3rem",
        color: "#83ff4d",
        fontSize: "0.8rem"
    },

    noneText: {
        color: "grey",
        fontSize: "0.8rem"
    }
}