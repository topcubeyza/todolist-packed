
export const style = {
    container: {
        display: "flex",
        backgroundColor: "#3a3d42",
        width: "100%",
        height: "100%",
        alignContent: "center",
        position: "fixed",
        justifyContent: "center",
        paddingTop: "2%",
        paddingBottom: "2%",
    },

    bsContainer: {
    },

    row: {
        // display: "flex",
        // position: "fixed",
        // width: "100%",
        // height: "100%",
        minWidth: 1000
    },

    col: {
        paddingLeft: 3,
        paddingRight: 3,
        height: "100%"
    },

    columnContainer: {
        display: "flex",
        flexDirection: "column",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "grey",
        padding: "2%",
        backgroundColor: "#45494f",
        width: "100%",
        height: "600px"
    },

    alignRight: {
        textAlign: "right"
    },

    logOutContainer: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: 20,
        fontSize: "1.2rem",
        color: "orangered",
        fontWeight: "bold",
        cursor: "pointer",
        ":hover": {
            color: "white"
        }
    }
}