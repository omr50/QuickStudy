package com.cardApi.flashCardBackendAPI.todo;

import com.cardApi.flashCardBackendAPI.Email.EmailSenderService;
import com.cardApi.flashCardBackendAPI.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class TodoEmailReminderService {
    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private TodoRepository todoRepository;

    // since there may be many users that get the daily reminder
    // it would be a bad idea to send them all synchronously.
    // Need to send them all async so that they each have their
    // own thread.

    // DAILY REMINDER (todos)
    // find all todos where the reminder = daily
    // and get their email as well.
    // This would be an expensive operation if we had
    // millions of users. I guess if that were the case
    // we would have a cache or something of those todos.
    // so we don't have to repeat the expensive operation.
    // Then every new reminder added, we just add it to the
    // cache. That way we just append a todo to cache rather than doing
    // a query to get all of them every time. But for now just
    // use a simple jpa method.
    @Scheduled(cron = "0 0 10 * * ?")   // Scheduled for 10 am every day
    public void sendDailyReminderEmails() {
        System.out.println("Email Sent Daily");
        List<Todo> todos = todoRepository.findByReminder("daily");
        // executor service used to create threads since we want each email
        // to be sent asynchronously so that users that are toward the end
        // of the for loop don't receive the emails late.
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (var todo : todos) {
            System.out.println("Email Sent Daily");
            String message = "Hi " + todo.getUsername() + ", Your daily reminder that your task: " + todo.getDescription() + " is due on " + todo.getTargetDate();
            String subject = "Study: Reminder for " + todo.getDescription() + " task.";
            String email = todo.getReminderEmail();
            executorService.execute(() -> emailSenderService.sendEmail(email, subject, message));
//            emailSenderService.sendEmail(email, subject, message);
        }
        executorService.shutdown();
    }

    // WEEKLY reminder

    @Scheduled(cron = "0 0 10 * * 0")  // Scheduled for 10 am on Sunday (weekly)
    public void sendWeeklyReminderEmails() {
        List<Todo> todos = todoRepository.findByReminder("weekly");
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (var todo : todos) {
            System.out.println("Email Sent Weekly");
            String message = "Hi " + todo.getUsername() + ", Your weekly reminder that your task: " + todo.getDescription() + " is due on " + todo.getTargetDate();
            String subject = "Study: Reminder for " + todo.getDescription() + " task.";
            String email = todo.getReminderEmail();
            executorService.execute(() -> emailSenderService.sendEmail(email, subject, message));

//            emailSenderService.sendEmail(email, subject, message);
        }
        executorService.shutdown();
    }
}
