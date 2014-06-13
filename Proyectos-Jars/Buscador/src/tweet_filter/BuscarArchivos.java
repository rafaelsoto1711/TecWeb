package tweet_filter;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
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
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.queryparser.classic.MultiFieldQueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.Sort;
import org.apache.lucene.search.SortField;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;

import twitter4j.JSONArray;
import twitter4j.JSONException;
import twitter4j.JSONObject;

public class  BuscarArchivos {
		
	
	public static void main(String[] args) throws Exception {
		
		String index = "/Users/macbookpro15/Documents/Magister/TecnologiasWeb/buscador/App/tecweb/IR";
	    String[] field = {"tweet","sentimiento"};
	    
	  
	    
	    IndexReader reader = DirectoryReader.open(FSDirectory.open(new File(index)));
	    IndexSearcher searcher = new IndexSearcher(reader);
	    Map<String,Analyzer> analyzerPerField = new HashMap<String,Analyzer>();
    	analyzerPerField.put("sentimiento", new KeywordAnalyzer());
    	//Analyzer analyzer = new SpanishAnalyzer(Version.LUCENE_47);
    	PerFieldAnalyzerWrapper perFieldAnalyzer = new PerFieldAnalyzerWrapper(new SpanishAnalyzer(Version.LUCENE_47,stopWords()),analyzerPerField);
	    //QueryParser parser = new QueryParser(Version.LUCENE_47, field, analyzer);
	    MultiFieldQueryParser parser = new MultiFieldQueryParser(Version.LUCENE_47, field, perFieldAnalyzer);
	    
	    JSONObject jsonObject = new JSONObject(args[0]);
	    
	    
	    String pregunta = (String) jsonObject.get("query");
	    Query query = parser.parse(String.valueOf(pregunta));
	    buscador(searcher, query);
	    reader.close();
	}
	
	public static CharArraySet stopWords() {  
		FileReader carga = new FileReader("/Users/macbookpro15/Documents/Magister/TecnologiasWeb/buscador/App/tecweb/stopwords/stopwords.txt");
		ArrayList<String> stopWords = null;
		boolean status = carga.initReadStopWords();
		if(status){
			stopWords =carga.getStop_words();
		}else{
			System.out.println("No se logro cargar la informaicón");
		}
		
		return StopFilter.makeStopSet(Version.LUCENE_47,stopWords);  
	}
	
	public static void buscador(IndexSearcher searcher, Query query) throws IOException, JSONException{
		long start = new Date().getTime();	
		int cantHitsMax = 100;
		TopDocs results = searcher.search(query, cantHitsMax, new Sort(new SortField("ranking", SortField.Type.FLOAT, true)));
	    ScoreDoc[] hits = results.scoreDocs;
	    int max = Math.min(results.totalHits, cantHitsMax);
	    long end = new Date().getTime();
	    
	    //doc.get("followers");
	    
	    //System.out.println("Se encontraton "+results.totalHits+" resultados ("+ Math.rint((end-start)*0.001*1000)/1000 + " segundos)");
	    JSONArray objRespuestaFinal = new JSONArray();
	    for (int i = 0; i < max; i++) {   
	    	Document doc = searcher.doc(hits[i].doc);
	    	JSONObject objRespuesta = new JSONObject();
	    	//objRespuesta.put("id_tweet",doc.get("id"));
		    objRespuesta.put("text_tweet", doc.get("tweet"));
		    objRespuesta.put("user_name", doc.get("user_name"));
		    objRespuesta.put("date_tweet", doc.get("date_tweet"));
		    objRespuesta.put("keyword", doc.get("keyword"));
		    if(Integer.parseInt(doc.get("sentimiento"))==1){
		    	objRespuesta.put("sentimiento", "Positivo");
		    }
		    if(Integer.parseInt(doc.get("sentimiento"))==0){
		    	objRespuesta.put("sentimiento", "Neutro");
		    }
		    if(Integer.parseInt(doc.get("sentimiento"))==-1){
		    	objRespuesta.put("sentimiento", "Negativo");
		    }
		    objRespuesta.put("num_user_followers", doc.get("followers"));
		    objRespuesta.put("retweets", doc.get("retweets"));
		    objRespuestaFinal.put(objRespuesta);
	        System.out.println(hits[i].doc+" Ranking= "+doc.get("ranking")+"; Contenido= " +doc.get("tweet")+"; sentimiento= " +doc.get("sentimiento"));
	    }
	    System.out.println(objRespuestaFinal);
	  }
}