package tweet_filter;

public class clasificacion {
	private int sentiment;
	private String data;
	
	public clasificacion(int s, String d) {
		this.sentiment = s;
		this.data = new String(d);
	}

	public int getSentiment() {
		return sentiment;
	}

	public void setSentiment(int sentiment) {
		this.sentiment = sentiment;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}
	
	
	
}
