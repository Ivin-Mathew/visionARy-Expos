/* eslint-disable prettier/prettier */
import {React, useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity, Linking} from 'react-native';

const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const questions = [
    {   id: 1,
        question: 'What is visionARy expos?',
        content: '"visionARy expos"  is an app designed to showcase models at expos.\nUsers can upload thier models, textures and a marker image. When the AR view encounters the marker image, the model is rendered on top of the marker.',
    },
    {   id: 2,
        question: 'How do I upload a model?',
        content: 'You can upload your models by clicking on the "Upload Your Models" button in the home screen. You can then upload the files through the respective buttons.\n',
        linkText: 'Click here to see watch a tutorial!',
        linkUrl: 'https://www.youtube.com/watch?v=-CePvJE_bok&ab_channel=IvinMathew',
    },
    {   id: 3,
        question: 'Why isn\'t my model loading?',
        content: 'The app might not have detected the marker image. Try removing the current uploaded marker image and upload a new marker image.\nIf that doesn\'t solve the issue, the uploaded files of the 3D model might be corrupted.Try uploading a different set of files and see if the issue is solved.\n',
        linkText: 'Contact me if issues persist.',
        linkUrl: 'mailto:ivinmk2410@gmail.com',
    },
    {   id: 4,
        question: 'Why are the textures not visible?',
        content: 'Textures might not be visible if the image names do not match the file names provided in the .mtl file. This usually hapens when the image is selected directly from gallery.\nTo resolve this issue, click the "Upload Images" button and then from the top right select "Browse" option. Navigate to the respective image locations and select the images. If the issue is not resolved, the files might be corrupted. Try again with a different set of files to see if it works.',
    },

  ];
  return (
    <View style={styles.container1}>
        <ImageBackground source={require('../assets/FAQwp.jpg')} style={styles.bg}>
            <View>
                <Text style={styles.title}>F.A.Qs</Text>
            </View>
            <View style={styles.container2}>
            {questions.map((q) => (
            <View key={q.id} style={styles.box}>
                <TouchableOpacity onPress={() => setSelectedQuestion(q.id)} >
                    <Text style={styles.qn}>
                        {q.question}
                    </Text>
                </TouchableOpacity>
                {selectedQuestion === q.id && <Text style={styles.answer}>
                    {q.content}
                    {q.linkText && (
                        <Text
                            style={{color: 'blue'}}
                            onPress={() => Linking.openURL(q.linkUrl)}>
                            {q.linkText}
                        </Text>
                    )}
                </Text>}
            </View>
          ))}
            </View>
        </ImageBackground>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
    container1:{
        flex: 1,
    },
    container2:{
        flex: 1,
    },
    bg:{
        flex: 1,
        alignItems: 'center',
    },
    title:{
        fontSize: 56,
        marginTop: 25,
        marginBottom:30,
        fontWeight: 'bold',
        color:'white',
    },
    box:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        margin: 5,
        borderRadius:15,
        borderColor:'#00246B',
        backgroundColor: 'white',
    },
    qn: {
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        justifyContent: 'center',
        minWidth:350,
        color:'black',
    },
    answer: {
        marginTop: 5,
        margin:20,
        fontWeight:'200',
        color:'black',
        textAlign:'justify',
        fontSize:18,


    },
});
