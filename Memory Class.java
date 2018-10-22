public class Memory {
    private int x;
    private int y;

    public static void main(String [] args) {
        System.out.println(ObjectSizeFetcher.getObjectSize(new C()));
    }
    byte[] bytes = new byte[2048];
    
}