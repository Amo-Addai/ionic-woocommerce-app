<?php

// onesignal config

add_filter( // in-built wordpress method
    'onesignal_send_notification',
    'onesignal_send_notification_filter',
    10, 40
);

function onesignal_send_notification_filter(
    $fields,
    $new_status,
    $old_status,
    $post
) {
    // change notification's title, message, & url
    if (
        $post->post_type
        == 'product'
    ) {
        $fields['headings'] = array(
            'en' => 'New Product on WooIonic'
        );
        $fields['contents'] = array(
            'en' =>
                $post->post_title
                . ' is launched. Check it out'
        );
    }

    // /*
    $fields['headings'] = array(
        'en' => 'English notification message title'
    );
    $fields['contents'] = array(
        'en' => 'English notification message body'
    );
    $fields['url'] = null;
    // */
    unset($fields['url']);

    // /*
    $fields['data'] = array(
        'id' => $post->ID
    );
    // */

    // send to additional platform (eg. android & ios)
    $fields['isAndroid'] = true;
    // $fields['isIos'] = true;

    // /*

    // prevent the notifcation from being sent to certain platforms
    $fields['isFirefox'] = false;

    // schedule the notification to be sent in the future
    $fields['send_after'] = 'Sept 24 2024 14:00:00 GMT-0700';

    // schedule the notification to be delivered at the specific hour of the destination timezone
    $fields['delayed_option'] = 'timezone';
    $fields['delivered_time_of_day'] = '9:00AM';

    // add web push action buttons (different action butotns are used for android & ios)
    $fields['web_buttons'] = array(
        'id' => 'like-button',
        'text' => 'Like',
        'icon' => 'https://i.imgur.com/??.png',
        'url' => 'https://example.com'
    );

    // cancel the notification from being sent
    $fields['do_send_notification'] = false;

    // */
    
    return $fields;
}

?>