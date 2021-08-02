import React,{useState,useEffect} from 'react';
import NewsCards from './components/NewsCards/NewsCards';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import useStyles from './styles';
const alanKey='d61dcae4b51082c50d15f138167e74cb2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App=()=>
{
    const[newsArticles,setNewsArticles]=useState([]);
    const[activeArticle,setActiveArticle]=useState(-1);
    const classes=useStyles();
    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({command,articles,number}) =>
            {
if(command==='newHeadlines')
{
    setNewsArticles(articles);
    setActiveArticle(-1);
}else if(command==='highlight')
{
    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
}else if(command==='open')
{
    const parsedNumber=number.length>2 ? wordsToNumbers(number,{fuzzy:true}):number;
    const article=articles[parsedNumber-1];
    if(parsedNumber>20)
    {
        alanBtn().playText('Please try that again.');
    }
    else if(article)
    {
    window.open(article.url,'_blank');
    alanBtn().playText('Opening...');
    }
}
            }
        })
    },[])
    return(
        <div>
           <div className={classes.logoContainer}>
               <img src="https://thumbs.dreamstime.com/b/watercolor-brush-calligraphy-concept-word-news-watercolor-brush-calligraphy-concept-word-news-vector-hand-lettering-rainbow-118307972.jpg" className={classes.alanLogo} alt="logo"/>
           </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}
export default App;