```java

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ThreadMain {
	
	private static int threadPoolCount = 2;
	private static ExecutorService threadPool = Executors.newFixedThreadPool(threadPoolCount);
	
	private static int sheduledPoolCount = 2;
	private static ScheduledExecutorService scheduledPool = Executors.newScheduledThreadPool(sheduledPoolCount);

	
	public void noThreads() {
		for (int i = 0; i < 3; i++) {
			new Console("No Thread #" + i, 10);
		}
	}
	
	public void threadPool() {
		for (int i = 0; i < threadPoolCount + 2; i++) {
			final int  j = i;
			threadPool.execute(()->{
				new Console(String.format("Thread pool #%d", j), 10);
			});
		}
	}
	
	public void scheduledPool() {
		for (int i = 0; i < sheduledPoolCount + 2; i++) {
			final int  j = i;
			scheduledPool.scheduleWithFixedDelay(
				()->{
					new Console(String.format("Scheduled pool #%d", j), 10);
				},
				j, // initialDelay
				4 + j, // delay
				TimeUnit.SECONDS // unit
			);
		}
	}
	
	
	public static void main(String[] args) {
		System.out.println("START");
		ThreadMain m = new ThreadMain();
		/*
		System.out.println("NO THREADS");
		m.noThreads();
		//*/
		/*
		System.out.println("THREAD POOL");
		m.threadPool();
		//*/
		/*
		System.out.println("SHEDULED THREAD POOL");
		m.scheduledPool();
		 //*/
		
		try {
			Thread.sleep(120000); // two minutes sleep until others threads finished
		} catch (InterruptedException e) {}		
		
		scheduledPool.shutdown();
		threadPool.shutdown();
		
		System.out.println("END");
	}
}

```

```java

public class Console {
	
	public Console(String name, int max) {
		this(name, max, 1);
	}

	public Console(String name, int max, int secondSleep) {
		System.out.println(name + " started");
		for (int i = 0; i < max; i++) {
			System.out.println(name + " " + i);
			try {
				Thread.sleep(secondSleep * 1000);
			} catch (InterruptedException e) {}
		}
		System.out.println(name + " finished");
	}
}

```