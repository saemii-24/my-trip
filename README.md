# My-Trip

## IA

```mermaid
erDiagram
    User {
        string userId
        string name
        string email
        string profileImage
    }
    Trip {
        string tripId
        string name
        string creatorId
        string[] participants
        boolean isPrivate
        string shareLink
    }
    DayPlan {
        string dayPlanId
        string tripId
        int dayNumber
        datetime date
    }
    Destination {
        string destinationId
        string dayPlanId
        string name
        object location
        datetime plannedArrivalTime
        duration travelTimeFromPrevious
    }
    Comment {
        string commentId
        string destinationId
        string authorId
        string content
        boolean isPrivate
        datetime createdAt
    }

    User ||--o{ Trip : "can create"
    Trip ||--o{ DayPlan : "has"
    DayPlan ||--o{ Destination : "includes"
    Destination ||--o{ Comment : "has"

```

## 메뉴구조도

```mermaid
graph TD
    Home[홈]
    Login[로그인/회원가입]
    MyTrips[내 여행 리스트]
    TripDetail[여행 상세]
    ManageParticipants[참가자 관리]
    ShareTrip[여행 계획 공유]
    PublicTrips[공유된 여행 보기]
    DayPlanDetail[날짜별 여행 상세]
    DestinationDetail[여행지 상세]

    Home --> Login
    Home --> MyTrips
    Home --> PublicTrips
    MyTrips --> TripDetail
    TripDetail --> ManageParticipants
    TripDetail --> ShareTrip
    TripDetail --> DayPlanDetail
    DayPlanDetail --> DestinationDetail
    DestinationDetail --> Comments[댓글]
```

## 유저 플로우

```mermaid
flowchart TD
    Start[웹사이트 오픈] --> Login[로그인/회원가입]
    Login -->|로그인 성공| Home[홈 화면]
    Home -->|여행 리스트 보기| MyTrips[내 여행 리스트]
    Home -->|공유된 계획 보기| PublicTrips[공유된 여행 계획]

    MyTrips -->|새 여행 계획 생성| CreateTrip[여행 계획 생성]
    MyTrips -->|여행 상세 보기| TripDetail[여행 상세]
    TripDetail -->|참가자 관리| ManageParticipants[참가자 초대]
    TripDetail -->|공유 버튼 클릭| ShareTrip[공유 상태 전환]
    TripDetail -->|날짜 추가| DayPlanDetail[날짜별 여행 계획]
    DayPlanDetail -->|여행지 추가| DestinationDetail[여행지 상세]
    DestinationDetail -->|댓글 작성| Comments[댓글 관리]

    PublicTrips -->|공유된 계획 클릭| PublicTripDetail[공유된 여행 상세]
    PublicTripDetail -->|댓글 작성| PublicComments[공개 댓글 관리]

    CreateTrip --> MyTrips
    ManageParticipants --> TripDetail
    ShareTrip --> PublicTrips
    DayPlanDetail --> TripDetail
    Comments --> DestinationDetail
    PublicComments --> PublicTripDetail
    End[종료]

```

## 💡 깃모지

| 이모지 | 타입       | 설명                         |
|--------|------------|------------------------------|
| 🎉     | `init`     | 첫 번째 커밋                 |
| 🚀     | `feat`     | 새로운 기능 추가             |
| 🐛     | `fix`      | 버그 수정                    |
| ♻️     | `refactor` | 리팩토링                     |
| 📝     | `docs`     | 문서 수정                    |
| 🎨     | `style`    | 코드 스타일/포맷 수정        |
| 🚀     | `chore`    | 빌드/배포 관련 작업          |
| ✅     | `test`     | 테스트 코드 추가/수정        |
| 🔧     | `config`   | 설정 파일 변경               |

