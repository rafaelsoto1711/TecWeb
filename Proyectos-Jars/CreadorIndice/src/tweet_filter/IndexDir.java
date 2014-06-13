package tweet_filter;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.core.KeywordAnalyzer;
import org.apache.lucene.analysis.core.StopFilter;
import org.apache.lucene.analysis.es.SpanishAnalyzer;
import org.apache.lucene.analysis.miscellaneous.PerFieldAnalyzerWrapper;
import org.apache.lucene.analysis.util.CharArraySet;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.DoubleField;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.FloatField;
import org.apache.lucene.document.IntField;
import org.apache.lucene.document.LongField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.IndexWriterConfig.OpenMode;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;

public class IndexDir {
  
	static ArrayList<Tweet> array = new ArrayList<Tweet>();
		
	public static void main(String[] args) {
	    String dirIndex = "/Users/macbookpro15/Documents/Magister/TecnologiasWeb/buscador/App/tecweb/IR"; //path donde se guardarán los índices invertidos en disco
	    try{
	    	ConexionMongo nueva = new ConexionMongo();
	    	array=nueva.readFilterAndOutput("localhost", 27017,"tecweb", "tweet");
	    	System.out.println("Directorio que guarda los índices invertidos " + dirIndex + "...");
	    	Directory dir = FSDirectory.open(new File(dirIndex));
	    	Map<String,Analyzer> analyzerPerField = new HashMap<String,Analyzer>();
	    	analyzerPerField.put("sentimiento", new KeywordAnalyzer());
	    	PerFieldAnalyzerWrapper perFieldAnalyzer = new PerFieldAnalyzerWrapper(new SpanishAnalyzer(Version.LUCENE_47,stopWords()),analyzerPerField);
	    	 //Analyzer analyzer = new StopAnalyzer(Version.LUCENE_47,stopWords());
	    	//Analyzer analyzer = new SpanishAnalyzer(Version.LUCENE_47);
	    	IndexWriterConfig indexWriter = new IndexWriterConfig(Version.LUCENE_47, perFieldAnalyzer);
	    	System.out.println("create");
	    	indexWriter.setRAMBufferSizeMB(2048.0);
	    	indexWriter.setOpenMode(OpenMode.CREATE);
	    	IndexWriter writer = new IndexWriter(dir, indexWriter);//se escribe el índice en el path configurado
	    	indexDocs(writer);
	    	writer.forceMerge(1);
	    	writer.close();
	    }catch (IOException e){
	      System.out.println(e.getMessage());
	    }
	}
	
	public static CharArraySet stopWords() { 
		FileReader prueba = new FileReader("/Users/macbookpro15/Documents/Magister/TecnologiasWeb/buscador/App/tecweb/stopwords/stopwords.txt");
		ArrayList<String> see = null;
		boolean hola = prueba.initReadStopWords();
		if(hola){
			see =prueba.getStop_words();
		}
		
		return StopFilter.makeStopSet(Version.LUCENE_47,see);  
	} 
	
	static void indexDocs(IndexWriter writer) throws IOException{
		long start = new Date().getTime();
		float rankRetweet = ordenaRetweet();
		float rankFollowers = ordenaFollowers();
		System.out.println(rankFollowers);
			for(Tweet tweet : array){
				float rank = tweet.getRetweets()/rankRetweet;
	        	Document doc = new Document();
	        	doc.add(new LongField("id", Long.parseLong((String.valueOf(tweet.getId()))),Field.Store.YES));
	        	doc.add(new TextField("tweet", String.valueOf(tweet.getTweet()),Field.Store.YES));
	        	doc.add(new TextField("user_name", String.valueOf(tweet.getUser()),Field.Store.YES));
	        	doc.add(new TextField("date_tweet", String.valueOf(tweet.getDate()),Field.Store.YES));
	        	doc.add(new TextField("keyword", String.valueOf(tweet.getKeyword()),Field.Store.YES));
	        	doc.add(new IntField("sentimiento", tweet.getSentimiento(),Field.Store.YES));
	        	doc.add(new FloatField("ranking", rank,Field.Store.YES));
	        	doc.add(new IntField("followers", tweet.getFollowers(),Field.Store.YES));
	        	doc.add(new IntField("indxRetweet", tweet.getRetweets(),Field.Store.YES));
	            //System.out.println("Idexando tweet: " + tweet.getTweet());
	            writer.addDocument(doc);
			}
		long end = new Date().getTime();
		System.out.println("Indexación demoró: "+(end-start)*0.001+"(s)");
	}	
	
	public static float ordenaRetweet(){
        Collections.sort(array, new Comparator<Tweet>(){
                @Override
                public int compare(Tweet hypo1, Tweet hypo2) {
                        return new Integer(hypo1.getRetweets()).compareTo(hypo2.getRetweets());
                }
                
        });
        Tweet tweet = array.get(array.size()-1);
        return tweet.getRetweets();
	}
	
	public static float ordenaFollowers(){
        Collections.sort(array, new Comparator<Tweet>(){
                @Override
                public int compare(Tweet hypo1, Tweet hypo2) {
                        return new Integer(hypo1.getFollowers()).compareTo(hypo2.getFollowers());
                }
                
        });
        Tweet tweet = array.get(array.size()-1);
        return tweet.getFollowers();
	}
}
