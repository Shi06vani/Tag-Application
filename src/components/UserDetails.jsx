import {View, Text, Image, TouchableOpacity} from 'react-native';

function UserProfile({user}) {
  if (!user)
    return <Text className="text-center text-gray-500">User not found</Text>;

const isFollowing= false

  return (
    <View className="flex-1  bg-white p-6">
      <Image
        source={{uri: user.profilePic}}
        className="w-24 h-24 rounded-full mb-4"
      />
      <View className='flex-row justify-between '>
        <View>
          <Text className="text-xl text-primary font-bold ">{user.name}</Text>
          <Text className="text-gray-500">{user.bio}</Text>
        </View>

        <TouchableOpacity>
          <Text
            className={`text-sm font-semibold px-4 py-1.5 rounded-md text-white ${
              isFollowing ? 'bg-secondary' : 'bg-primary'
            }   cursor-pointer`}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function UserDetails({route}) {
  const user = route?.params?.user || {
    name: 'John Doe',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Full Stack Developer | Tech Enthusiast',
  };

  return (
    <View className="flex-1 bg-white">
      <UserProfile user={user} />
    </View>
  );
}
