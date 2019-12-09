export const style = {
    row: {
        borderBottom:"1px solid #51555c",
        cursor: "pointer",
    },

    hover: {
        paddingTop: "2%",
        paddingBottom: "2%",
        ":hover": {
            backgroundColor: "#4f5359"
        },
        width: "100%"
    },

    nameContainer: {
        color: "white",
        fontWeight: "bold",
        fontSize: "1rem",
    },

    deadlineContainer: {
        color: "#d4d4d4",
        fontSize: "0.8rem",
        fontStyle: "italic",
    },

    createdOnContainer:{
        color: "grey",
        fontSize: "0.6rem",
        display: "flex",
        alignItems: "center"
    },

    title: {
    },

    iconContainer: {
        display: "flex",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },

    icon: {
        cursor: "pointer",
        color: "orange",
        fontSize: "0.7rem",
    },

    createdOnColumn: {
        display:"flex",
        justifyContent:"flex-end"
    }
}