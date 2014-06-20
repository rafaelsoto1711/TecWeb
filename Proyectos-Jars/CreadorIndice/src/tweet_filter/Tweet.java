package tweet_filter;


public class Tweet {

	public long id;
	public String tweet;
	public String user;
	public String date;
	public String keyword;
	public String photo;
	public int sentimiento;
	public int followers;
	public int retweets;
	

	
	public Tweet(long id, String tweet, String user, String date,
			String keyword, int sentimiento, int followers, int retweets, String photo) {
		super();
		this.id = id;
		this.tweet = tweet;
		this.user = user;
		this.date = date;
		this.keyword = keyword;
		this.sentimiento = sentimiento;
		this.followers = followers;
		this.retweets = retweets;
		this.photo = photo;
	}


	
	public Tweet() {
		super();
	}	
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTweet() {
		return tweet;
	}
	public void setTweet(String tweet) {
		this.tweet = tweet;
	}
	public int getSentimiento() {
		return sentimiento;
	}
	public void setSentimiento(int sentimiento) {
		this.sentimiento = sentimiento;
	}
	public int getFollowers() {
		return followers;
	}
	public void setFollowers(int followers) {
		this.followers = followers;
	}
	public int getRetweets() {
		return retweets;
	}
	public void setRetweets(int retweets) {
		this.retweets = retweets;
	}
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
}