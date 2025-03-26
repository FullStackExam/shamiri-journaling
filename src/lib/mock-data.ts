export interface Category {
    id: string
    name: string
    color: string
  }
  
  export interface JournalEntry {
    id: string
    title: string
    content: string
    entryDate: Date
    createdAt: Date
    updatedAt?: Date
    categories: Category[]
  }
  
  export const mockCategories: Category[] = [
    { id: "cat1", name: "Personal", color: "#9333ea" },
    { id: "cat2", name: "Work", color: "#0891b2" },
    { id: "cat3", name: "Health", color: "#16a34a" },
    { id: "cat4", name: "Ideas", color: "#f59e0b" },
    { id: "cat5", name: "Goals", color: "#ef4444" },
    { id: "cat6", name: "Travel", color: "#6366f1" },
    { id: "cat7", name: "Learning", color: "#ec4899" },
    { id: "cat8", name: "Gratitude", color: "#14b8a6" },
  ]
  
  export const mockEntries: JournalEntry[] = [
    {
      id: "entry1",
      title: "Morning Reflection",
      content:
        "Today I woke up feeling refreshed and ready to tackle the day. The sun was shining through my window, and I could hear birds chirping outside. I took a few minutes to meditate and set my intentions for the day.\n\nI'm grateful for the peaceful start to my morning and the opportunity to begin the day with a clear mind. I'm looking forward to making progress on my current project at work and hopefully finding time for a walk in the park later.",
      entryDate: new Date("2025-03-26T08:30:00Z"),
      createdAt: new Date("2025-03-26T08:35:12Z"),
      categories: [mockCategories[0], mockCategories[7]],
    },
    {
      id: "entry2",
      title: "Project Breakthrough",
      content:
        "Had a major breakthrough on the marketing campaign today! After weeks of struggling with the concept, everything finally clicked during our brainstorming session. The team was energized, and we mapped out a complete strategy in just two hours.\n\nThe key insight came when we shifted our perspective to focus on the emotional journey of our customers rather than just the features of our product. This simple change in approach opened up so many creative possibilities.\n\nI'm excited to present this to the stakeholders tomorrow and see their reaction. If approved, we could begin implementation as early as next week.",
      entryDate: new Date("2025-03-25T16:45:00Z"),
      createdAt: new Date("2025-03-25T17:20:30Z"),
      categories: [mockCategories[1], mockCategories[3]],
    },
    {
      id: "entry3",
      title: "New Workout Routine",
      content:
        "Started my new workout routine today. I've decided to focus on strength training three times a week, with cardio on alternate days. The first session was challenging but invigorating.\n\nI'm already feeling the positive effects on my energy levels and mood. The gym was relatively empty in the morning, which made it easier to access all the equipment I needed.\n\nMy goal is to stick with this routine for at least three months before evaluating its effectiveness. I'm tracking my progress in terms of strength gains, endurance improvements, and overall well-being.",
      entryDate: new Date("2025-03-24T07:15:00Z"),
      createdAt: new Date("2025-03-24T08:30:45Z"),
      categories: [mockCategories[2], mockCategories[4]],
    },
    {
      id: "entry4",
      title: "Book Reflections: 'Atomic Habits'",
      content:
        "Just finished reading 'Atomic Habits' by James Clear, and I'm blown away by the practical wisdom in this book. The concept of making tiny, 1% improvements that compound over time is so powerful yet simple to implement.\n\nI particularly resonated with the idea of identity-based habits – focusing on becoming the type of person who does certain things, rather than just focusing on the outcomes. This shift in perspective makes habit formation feel more intrinsic and meaningful.\n\nI'm going to implement the habit stacking technique starting tomorrow, attaching a new habit I want to develop (daily reading) to an existing habit (morning coffee). I'll track my progress and see how this approach works for me.",
      entryDate: new Date("2025-03-23T21:30:00Z"),
      createdAt: new Date("2025-03-23T21:45:22Z"),
      categories: [mockCategories[6], mockCategories[0]],
    },
    {
      id: "entry5",
      title: "Weekend Trip Planning",
      content:
        "Started planning a weekend getaway to the mountains next month. I've been feeling the need to disconnect and recharge in nature, and a short trip seems perfect.\n\nI've researched a few cabins that are available for rent, all within a 2-hour drive from the city. They offer stunning views and access to hiking trails, which is exactly what I'm looking for. I'm leaning toward the one with the private hot tub overlooking the valley.\n\nI plan to invite a couple of close friends to join me. We could share the cost and enjoy some quality time together away from our usual routines and distractions. I'll reach out to them tomorrow to see who's interested.",
      entryDate: new Date("2025-03-22T18:20:00Z"),
      createdAt: new Date("2025-03-22T18:35:10Z"),
      categories: [mockCategories[5], mockCategories[3]],
    },
    {
      id: "entry6",
      title: "Quarterly Goals Review",
      content:
        "Conducted my quarterly goals review today. I'm pleased with my progress in some areas but need to refocus on others.\n\nAchievements:\n- Completed the certification I've been working on\n- Established a consistent exercise routine\n- Reduced unnecessary expenses and increased savings rate\n\nAreas needing attention:\n- Reading goal is behind schedule\n- Haven't made progress on the side project\n- Still struggling with consistent sleep schedule\n\nFor the next quarter, I'm going to prioritize the side project by dedicating specific time blocks each week. I'll also set up a better system for tracking my reading progress and implement a stricter bedtime routine.",
      entryDate: new Date("2025-03-21T19:45:00Z"),
      createdAt: new Date("2025-03-21T20:30:15Z"),
      categories: [mockCategories[4], mockCategories[0]],
    },
    {
      id: "entry7",
      title: "Team Leadership Challenges",
      content:
        "Faced some challenging team dynamics at work today. Two team members have conflicting approaches to the current project, and it's creating tension in the group.\n\nI scheduled individual meetings with both of them to understand their perspectives better. It seems the root issue is a lack of clarity about project priorities and ownership of certain tasks.\n\nTomorrow, I plan to facilitate a focused discussion with the entire team to clarify roles, responsibilities, and decision-making processes. I'll also work on creating more structured communication channels to prevent similar issues in the future.\n\nThis is a good reminder that proactive leadership often means addressing potential conflicts before they escalate.",
      entryDate: new Date("2025-03-20T17:30:00Z"),
      createdAt: new Date("2025-03-20T18:15:40Z"),
      categories: [mockCategories[1], mockCategories[6]],
    },
    {
      id: "entry8",
      title: "Mindfulness Practice Insights",
      content:
        "My mindfulness practice has been particularly insightful this week. I've been focusing on body scan meditation, and it's helping me notice how I physically respond to stress throughout the day.\n\nI've observed that I tend to hold tension in my shoulders and jaw when I'm feeling overwhelmed. Simply becoming aware of this pattern has allowed me to release this tension more frequently, which seems to reduce my overall stress levels.\n\nI'm also noticing improvements in my ability to stay present during conversations. Instead of mentally preparing my response while the other person is still speaking, I'm truly listening and then responding more authentically.\n\nI want to continue developing this practice and perhaps explore loving-kindness meditation next.",
      entryDate: new Date("2025-03-19T21:15:00Z"),
      createdAt: new Date("2025-03-19T21:40:55Z"),
      categories: [mockCategories[2], mockCategories[7]],
    },
    {
      id: "entry9",
      title: "New App Idea",
      content:
        "Had an interesting idea for an app today while struggling to coordinate schedules with friends for our monthly dinner. What if there was an app specifically designed for recurring group events?\n\nKey features could include:\n- Templates for different types of recurring gatherings\n- Automatic rotation of hosting duties\n- Integrated preference tracking (dietary restrictions, etc.)\n- Simple voting mechanism for date selection\n- Expense sharing for group purchases\n\nI did some quick market research and didn't find anything that combines all these features in a user-friendly way. This could potentially fill a real need.\n\nI'm going to sketch out some basic wireframes this weekend and maybe run the concept by a few friends who work in tech to get their feedback.",
      entryDate: new Date("2025-03-18T14:20:00Z"),
      createdAt: new Date("2025-03-18T14:45:30Z"),
      categories: [mockCategories[3], mockCategories[6]],
    },
    {
      id: "entry10",
      title: "Gratitude Reflection",
      content:
        "Taking some time today to reflect on things I'm grateful for:\n\n1. My health - I've been feeling energetic and well lately\n2. Supportive friends who make time to connect despite busy schedules\n3. Financial stability that allows me to pursue my interests\n4. Access to learning resources that help me grow personally and professionally\n5. The beautiful spring weather we've been having\n\nI notice that when I deliberately practice gratitude, my overall outlook becomes more positive. Small annoyances don't bother me as much, and I feel more connected to the people around me.\n\nI want to make this a weekly practice - perhaps every Sunday evening as a way to start the new week with a positive mindset.",
      entryDate: new Date("2025-03-17T20:00:00Z"),
      createdAt: new Date("2025-03-17T20:25:18Z"),
      categories: [mockCategories[7], mockCategories[0]],
    },
  ]
  
  