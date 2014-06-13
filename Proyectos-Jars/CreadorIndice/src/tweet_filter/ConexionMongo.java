package tweet_filter;


import java.io.FileNotFoundException;
import java.net.UnknownHostException;
import java.util.ArrayList;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

public class ConexionMongo {
	int count;
	DB db;
	private static final ArrayList<Tweet> tweets = new ArrayList<Tweet>();
	public ConexionMongo(String filePath,int count) {
		super();
		this.count = count;
	}

	public ConexionMongo() {
		super();
	}

	public ArrayList<Tweet> readFilterAndOutput(String host_database, int port_database, String db_name, String collection_name) throws FileNotFoundException {

		MongoClient mongo;
		
		DBCollection coll = null;
			try {
				mongo = new MongoClient(host_database, port_database);
				db = mongo.getDB(db_name);
				coll = db.getCollection(collection_name);
				//boolean auth = db.authenticate("tecweb_user", "tecweb12345".toCharArray());
			/*
				if (auth) {	
					System.out.println("Login is successful!");
				} else {
					System.out.println("Login is failed!");
				}	
			*/
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			DBCursor cursor = coll.find();	
		    try {
		       while(cursor.hasNext()) {
		    	   DBObject jsonObjeto = cursor.next();
		    	   Tweet Tweets=new Tweet(
		    			   Long.parseLong(String.valueOf(jsonObjeto.get("id_tweet"))),
		    			   String.valueOf(jsonObjeto.get("text_tweet")),
		    			   String.valueOf(jsonObjeto.get("user_name")),
		    			   String.valueOf(jsonObjeto.get("date_tweet")),
		    			   String.valueOf(jsonObjeto.get("keyword")),
		    			   1,
		    			   Integer.parseInt(String.valueOf(jsonObjeto.get("num_user_followers"))),
		    			   Integer.parseInt(String.valueOf(jsonObjeto.get("num_retweet"))));
		    	   //System.out.println(jsonObjeto.get("text_tweet"));
		    	   tweets.add(Tweets);
		       }
		       
			} finally {
		       cursor.close();
		    }
			return tweets;
		}
}
