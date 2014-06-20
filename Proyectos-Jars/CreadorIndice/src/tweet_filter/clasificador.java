package tweet_filter;

import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Vector;

import cc.mallet.classify.*;
import cc.mallet.pipe.*;
import cc.mallet.pipe.iterator.*;
import cc.mallet.types.*;

public class clasificador {
	
	private Classifier c;
	private String dataFile;
	private File stoplistFile;
	private Pipe instancePipe;
	
	public clasificador(String d, String sl) throws FileNotFoundException {
		this.dataFile = new String(d);
		this.stoplistFile = new File(sl);
		
		/* creamos el filtro de stopwords extra  */
		TokenSequenceRemoveStopwords stopwordFilter = new TokenSequenceRemoveStopwords();
		stopwordFilter.setCaseSensitive(false);
		stopwordFilter.addStopWords(stoplistFile);
		
		/* Creamos el pipe que va a filtrar la informaci—n leida  */
		
		this.instancePipe = new SerialPipes (new Pipe[] {
				new Target2Label (),							  // Target String -> class label
				new Input2CharSequence (),				  // Data File -> String containing contents
				new CharSequence2TokenSequence (),  // Data String -> TokenSequence
				new TokenSequenceLowercase (),		  // TokenSequence words lowercased
				//new TokenSequenceRemoveStopwords (),// Remove stopwords from sequence
				stopwordFilter,
				new TokenSequence2FeatureSequence(),// Replace each Token with a feature index
				new FeatureSequence2FeatureVector(),// Collapse word order into a "feature vector"
			});
		
		/* creamos la lista de instancias usando el p’pe anterior y la informaci—n del archivo de datos de entrenamiento */
		InstanceList instances = new InstanceList (instancePipe);
		instances.addThruPipe(new CsvIterator(this.dataFile,
                "(\\w+)\\s+(\\w+)\\s+(.*)",
                3, 2, 1)  // (data, target, name) field indices                    
				);
		
		/* creaci—n del entrenador para el clasificador NaiveBayes y posterior entrenamiento */
		ClassifierTrainer naiveBayesTrainer = new NaiveBayesTrainer();
		this.c = naiveBayesTrainer.train (instances);
		
	}
	
	
	public void testClassifier(String testDataFile) throws FileNotFoundException{
		
		/* creacion de lista de instancias de prueba.
		 * Las instancias de prueba tienen la misma forma de las instancias de entrenamiento, con lo que
		 * podemos confirmar que la clasificaci—n obtenida fue acertada */
		InstanceList test = new InstanceList(this.instancePipe);
		test.addThruPipe(new CsvIterator(testDataFile,
                "(\\w+)\\s+(\\w+)\\s+(.*)",
                3, 2, 1)  // (data, target, name) field indices                    
				);
		int numCorrect = 0;
		for (int i = 0; i < test.size(); i++) {
			Instance inst = test.get(i);
			Classification cf = this.c.classify(inst);
			System.out.println("class original: "+inst.getLabeling().getBestLabel().toString()+"- class classifier:"+cf.getLabeling().getBestLabel().toString());
			if (cf.getLabeling().getBestLabel() == inst.getLabeling().getBestLabel())
				numCorrect++;
		}
		System.out.println ("Precisi—n del clasificador en conjunto prueba = " + ((double)numCorrect)/test.size());
		
		
	}
	
	public int classifySingleTerm(String t){
		String l;

		Classification cf =  this.c.classify(t);
		l = new String(cf.getLabeling().getBestLabel().toString());
		//System.out.println(cf.getLabeling().getBestValue());
		if(l.equals("positive")){
			if(cf.getLabeling().getBestValue() < 0.5){
				return 0;
			}else{
				return 1;
			}
		}else if (l.equals("negative")) {
			if(cf.getLabeling().getBestValue() < 0.5){
				return 0;
			}else{
				return -1;
			}
		}else{
			return 0;
		}
		/*if(cf.getLabeling().getBestValue()>=0.67){
			l = new String(cf.getLabeling().getBestLabel().toString());
			if(l.equals("positive")){
				value = 1;
			}else{
				value = -1;
			}
		}else{
			/* caso neutral 
			value = 0;
		}
		*/

	}

	public Vector<clasificacion> classifyTerms(Vector<String> terms){
		Vector<clasificacion> r = new Vector<clasificacion>();
		for (String t : terms) {
			int value = classifySingleTerm(t);
			clasificacion temp = new clasificacion(value, t);
			r.add(temp);
		}
		return r;
		
	}
	

}
