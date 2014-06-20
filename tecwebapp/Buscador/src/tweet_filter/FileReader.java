package tweet_filter;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;

public class FileReader {

	private String fileStopWords;
	ArrayList<String> stop_words;
	
	// Constructor
	public FileReader(String _fileStopWords) {
		fileStopWords = _fileStopWords;
		stop_words = new ArrayList<String>();
	}
	public Boolean initReadStopWords() {
	
		InputStream fis;
		BufferedReader br;
		String line;
		
		try {
			fis = new FileInputStream(fileStopWords);
			br = new BufferedReader(new InputStreamReader(fis, Charset.forName("UTF-8")));
			while ((line = br.readLine()) != null) {
				stop_words.add(line);
			}
			br.close();
		} catch (FileNotFoundException e) {
			System.out.println("File not Found");
			e.printStackTrace();
			return false;
		} catch(IOException e1){
			System.out.println("IOException");
			e1.printStackTrace();
			return false;
		}
			br = null;
			fis = null;
			return true;
	}
	public ArrayList<String> getStop_words() {
		return stop_words;
	}
}