import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";



const styles = StyleSheet.create({
    body: {
        padding: 50,
    },
    header: {
        fontSize: 50,
        color: "green",
        display: "block",
    },
    image: {
        width: 300,
        height: "auto",
        display: "block",
    },
    section: {
        color: 'pink',
    }
});

//  styles.section, { color: 'blue'}, {fontSize: 80} ]

export const PdfFile = (wdReason, wdType, cpnTrainer, studentName) => {
    
    
    
    return (
    <Document>
        <Page size="A4" style={styles.body}>
            <View>
                <Image style={styles.image} src={"https://images.unsplash.com/photo-1657827203250-b5ca2f58926c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1905&q=80"}/>
                <Text style={styles.header}>Withdrawal Form for {studentName}</Text>
            
                <Text style={styles.section}>Withdrawing from: </Text>
                <Text style={styles.section}>Type of Withdrawal: {wdType}</Text>
                <Text style={styles.section}>Trainer: {cpnTrainer}</Text>
                <Text style={styles.section}>Reason for Withdrawal: {wdReason}</Text>
                <Text></Text>
            </View>
        </Page>
    </Document>
    )
}

// export default PDFFile;