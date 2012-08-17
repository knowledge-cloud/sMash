package dart.mashup.utility;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Writer;
import java.util.HashSet;
import java.util.Set;
import java.util.Vector;

public class Translate {

	public void translate(String fName, String destFName)
	{
		try{
			File f = new File(fName);
			BufferedReader bin = new BufferedReader(new FileReader(f));
			Vector<int[]> v = new Vector();
			String str = "";
			do{
				str = bin.readLine();
				if(str != null){
					String[] arr = str.split(",");
					if(arr.length !=  6)
						System.err.println("error: not = 6");
					int[] arr2 = new int[6];
					for(int k = 0; k < arr.length; k++){
						arr2[k] = Integer.parseInt(arr[k]);
					}
					v.add(arr2);
				}
			}while(str != null);
			Writer output = new BufferedWriter(new FileWriter(new File(destFName)));
			output.write("Item");
			int size = v.size();
			for(int i = 0; i < size; i++){
				output.write("\t" + String.valueOf(i));
			}
			output.write("\n");
			String res = "";
			for(int j = 1; j < 34; j++){
				res = res + String.valueOf(j);
				res = res + getExistStr(j, v);
				if(j != 33)
					res += "\n";
			}
			output.write(res);
			output.close();
			System.out.println("Completed!");
			
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public String getExistStr(int item, Vector<int[]> v)
	{
		String re = "";
		int size = v.size();
		
		for(int i = 0; i < size; i++){
			int[] arr = v.get(i);
			int j;
			for(j = 0; j < arr.length; j++){
				if(arr[j] == item){
					re = re + "\t1";
					break;
				}
			}
			if(j == arr.length)
				re = re + "\t0";
		}
		
		return re;
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Translate t = new Translate();
		t.translate("E:\\NLC\\data\\flcp.txt", "E:\\NLC\\data\\flcpResult.txt");
	}

}
