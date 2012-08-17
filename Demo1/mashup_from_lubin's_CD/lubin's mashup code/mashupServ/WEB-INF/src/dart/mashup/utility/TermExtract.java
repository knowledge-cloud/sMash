package dart.mashup.utility;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Writer;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.util.Vector;

import org.w3c.dom.Document;
import org.w3c.dom.Node;

import dart.mashup.xmlProcessor.*;
import dart.mashup.xmlWriter.XMLWriter;

public class TermExtract {

	/**
	 * @param args
	 */
	public void extractName(String tileFile, String dataSetFile, String destFile)
	{
		try{
			File dataSetf = new File(dataSetFile);
			BufferedReader bin = new BufferedReader(new FileReader(dataSetf));
			String str = "";
			Set apiSet = new HashSet();
			do{
				str = bin.readLine();
				if(str == null)
					str = bin.readLine();
				if(str != null){
					int index = str.indexOf("Sources:\t");
					if(index != -1){
						int index2 = str.indexOf("\t");
						String[] arr = str.substring(index2 + 1).split("\t");
						for(int i = 0; i < arr.length; i++)
							apiSet.add(arr[i]);
					}
				}
			}while(str != null);
			/* read tile.xml */
			Vector<String> matchV = new Vector();
			File tileF = new File(tileFile);
			XMLProcessor xmlProIns = new XMLProcessor(tileF);
			Document doc = xmlProIns.getDocument();
			XMLWriter xmlWriterIns = new XMLWriter();   
			xmlWriterIns.setDocument(doc);
			xmlWriterIns.setFile(tileF);
			Node root = (Node)xmlWriterIns.getRoot();
			int count = xmlWriterIns.getChildCount(root);
			String result = "";
			for(int j = 0; j < count; j++){
				Node child = (Node)xmlWriterIns.getChild(root, j);
				Node textNode = (Node)xmlWriterIns.getChild(child, "name");
				if(textNode == null)
					continue;
				String s = textNode.getTextContent();
				match(s, apiSet, matchV);
			//	if(matchRes != null)
			//		result = result + s + ":\t" + matchRes + "\n";
			}
			int size = matchV.size();
			for(int k = 0; k < size; k++){
				result = result + matchV.get(k) + "\n";
			}
			Writer output = new BufferedWriter(new FileWriter(new File(destFile)));
			output.write(result);
			output.close();
			System.out.println("Completed!");
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	public void findMatchedMashup(String dataSetFile, String refFile, String destFile)
	{
		try{
			File dataSetf = new File(dataSetFile);
			BufferedReader bin = new BufferedReader(new FileReader(dataSetf));
			String str = "";
			Vector<String[]> v = readFile(refFile);
			Vector<String> apiSet = new Vector();
			Boolean flag = false;
			String content = "";
			Vector<String> finalV = new Vector();
			Vector<String> res = new Vector();
			do{
				str = bin.readLine();
				if(str == null || str.isEmpty()){
					if(content != null && flag)
						finalV.add(content + "\n");
				//	str = bin.readLine();
					content = "";
					flag = false;
				}
				else
					if(str != null){					
						int index = str.indexOf("Sources:\t");
						if(index != -1){
							apiSet.clear();
							int index2 = str.indexOf("\t");
							String[] arr = str.substring(index2 + 1).split("\t");
							if(arr.length < 2)
								continue;
							for(int i = 0; i < arr.length; i++)
								apiSet.add(arr[i]);
							res = belongTo(apiSet, v);
							if(res.get(0).compareTo("true") == 0 && isValid(res))
								flag = true;
						}
						if(index != -1 && flag){
							content += "Sources:\t";
							for(int j = 1; j < res.size(); j++){
								content += res.get(j);
								if(j != res.size() - 1)
									content += "\t";
							}
							content += "\n";
						}
						else
							content = content + str + "\n";
					}
			}while(str != null);	
			Writer output = new BufferedWriter(new FileWriter(new File(destFile)));
			int size = finalV.size();
			for(int i = 0; i < size; i++)
				output.write(finalV.get(i) + "\n");
			output.close();
			System.out.println("Completed!");
			
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public Boolean isValid(Vector<String> v)
	{
		int size = v.size();
	//	Boolean flag = false;
		
		for(int i = 0; i < size; i++){
			String tmp = v.get(i);
			for(int j = i + 1; j < size; j++){
				if(tmp.compareTo(v.get(j)) == 0)
					return false;
			}
		}
		
		return true;
	}
	
	public Vector<String> belongTo(Vector<String> s, Vector<String[]> v)
	{
		Iterator itr = s.iterator();
		Boolean flag = false;
		int size = s.size();
		Vector<String> res = new Vector();
		
		res.add("false");
		for(int i = 0; i < size; i++){
			String tmp = s.get(i);
            int size2 = v.size();
            for(int j = 0; j < size2; j++){
            	String[] arr = v.get(j);
            	if(compare(tmp, arr[0]) == 0){
            		flag = true;
            		res.add(arr[1]);
            		break;
            	}
            }
            if(!flag)
            	return res;
            flag = false;
		}
		
		res.set(0, "true");
        return res;
	}
	
	public Vector<String[]> readFile(String fName)
	{
		Vector<String[]> v = new Vector();
		try{
			BufferedReader bin = new BufferedReader(new FileReader(new File(fName)));
			String str = "";
			do{
				str = bin.readLine();
				if(str == null || str.isEmpty())
					str = bin.readLine();
				if(str != null && !str.isEmpty()){
						int index = str.indexOf("\t");
						String arr = str.substring(0, index);
						String arr2 = str.substring(index + 1);
						String[] a = new String[2];
						a[0] = arr;
						a[1] = arr2;
						v.add(a);
				}
			}while(str != null);			
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		return v;
		
		
	}
	public void match(String tileName, Set apiSet, Vector<String> matchV)
	{
		Iterator itr = apiSet.iterator();
		
        while (itr.hasNext()) {
            String tmp = (String) itr.next();
            if (compare(tileName, tmp) == 0) {
           //     res = res + tmp + "\t";
            	matchV.add(tmp + "\t" + tileName); 
            }
        }		

	}
	
	private int compare(String s1, String s2)
	{
		int res = 0;
		
		s1 = removeNoise(s1);
		s2 = removeNoise(s2);
		
		if(s2.indexOf(s1) != -1 || s1.indexOf(s2) != -1)
			res = 0;
		else
			res = 1;
		
		return res;
	}
	
	private String removeNoise(String s)
	{
		s = s.toLowerCase();
		s = s.replaceAll("[^0-9a-zA-Z ]", "");

		return s;
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		TermExtract te = new TermExtract();
	//	te.extractName("E:\\2_MT\\mashupServ\\data\\tileBackup-test.xml", "E:\\NLC\\data\\programmableWeb2.txt", "E:\\NLC\\data\\programmableWebResult2.txt");
		te.findMatchedMashup("E:\\NLC\\data\\programmableWeb2.txt", "E:\\NLC\\data\\programmableResultAPIFirst-2-25.txt", "E:\\NLC\\data\\programmableFinalResult4.txt");
	}

}
